import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { google } from "googleapis";

const credentialsPath = fileURLToPath(new URL("../auth/credentials.json", import.meta.url));
const tokensPath = fileURLToPath(new URL("../auth/tokens.json", import.meta.url));

export function createGmailError(operation: string, error: unknown): Error {
  const message = error instanceof Error ? error.message : "Unknown error";
  return new Error(`Gmail ${operation} failed: ${message}`);
}

let gmailClient: ReturnType<typeof google.gmail> | undefined;

try {
  const credentials = JSON.parse(await readFile(credentialsPath, "utf8"));
  const tokens = JSON.parse(await readFile(tokensPath, "utf8"));
  const { client_id, client_secret } = credentials.installed;

  const oauth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    "http://localhost:3000"
  );

  oauth2Client.setCredentials(tokens);

  gmailClient = google.gmail({
    version: "v1",
    auth: oauth2Client,
  });
} catch (error) {
  throw createGmailError("initializing Gmail client", error);
}

export const gmail = gmailClient!;