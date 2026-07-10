import { createServer } from "node:http";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { google } from "googleapis";
import { join } from "node:path";
import { homedir } from "node:os";

const credentials = JSON.parse(
  await readFile("../credentials.json", "utf8")
);

const { client_id, client_secret } = credentials.installed;

const REDIRECT_URI = "http://localhost:3000";

const oauth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  REDIRECT_URI
);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  prompt: "consent",
  scope: ["https://mail.google.com/"],
});

console.log("Open this URL in your browser:");
console.log(authUrl);

createServer(async (req, res) => {
  const url = new URL(req.url!, REDIRECT_URI);

  const code = url.searchParams.get("code");

  if (!code) {
    res.writeHead(400);
    res.end("Missing authorization code");
    return;
  }

  try {
    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Save tokens
    const configDir = join(homedir(), ".mailkit");

    await mkdir(configDir, { recursive: true });

    await writeFile(
      join(configDir, "tokens.json"),
      JSON.stringify(tokens, null, 2),
      "utf8"
    );

    console.log("✅ Tokens saved.");

    // Test Gmail API
    const gmail = google.gmail({
      version: "v1",
      auth: oauth2Client,
    });

    const profile = await gmail.users.getProfile({
      userId: "me",
    });

    console.log(profile.data);

    res.end("✅ Authentication successful. You can close this window.");

    process.exit(0);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end("Authentication failed");
  }
}).listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});