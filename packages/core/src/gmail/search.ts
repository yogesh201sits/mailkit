import { gmail } from "./client";
import { readEmail } from "./read";

export async function searchEmails(
  query: string,
  maxResults = 10
) {
  const res = await gmail.users.messages.list({
    userId: "me",
    q: query,
    maxResults,
  });

  const messages = res.data.messages ?? [];

  const emails = [];

  for (const message of messages) {
    emails.push(await readEmail(message.id!));
  }

  return emails;
}