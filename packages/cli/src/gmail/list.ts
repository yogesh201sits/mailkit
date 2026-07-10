import { gmail } from "./client";

export async function listEmails(maxResults = 10) {
  const res = await gmail.users.messages.list({
    userId: "me",
    maxResults,
  });

  return res.data.messages ?? [];
}