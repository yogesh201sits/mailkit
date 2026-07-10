import { gmail } from "./client";

export async function listEmails(maxResults = 10) {
  const response = await gmail.users.messages.list({
    userId: "me",
    maxResults,
  });

  const messages = response.data.messages ?? [];

  const emails = [];

  for (const message of messages) {
    const email = await gmail.users.messages.get({
      userId: "me",
      id: message.id!,
      format: "metadata",
      metadataHeaders: ["From", "Subject", "Date"],
    });

    const headers = email.data.payload?.headers ?? [];

    const from =
      headers.find((h) => h.name === "From")?.value ?? "";

    const subject =
      headers.find((h) => h.name === "Subject")?.value ?? "";

    const date =
      headers.find((h) => h.name === "Date")?.value ?? "";

    emails.push({
      id: message.id,
      threadId: message.threadId,
      from,
      subject,
      date,
      snippet: email.data.snippet,
    });
  }

  return emails;
}