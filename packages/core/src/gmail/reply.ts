import { gmail } from "./client";

interface ReplyEmailOptions {
  threadId: string;
  messageId: string;
  to: string;
  subject: string;
  body: string;
}

export async function replyEmail({
  threadId,
  messageId,
  to,
  subject,
  body,
}: ReplyEmailOptions) {
  const message = [
    `To: ${to}`,
    `Subject: Re: ${subject}`,
    `In-Reply-To: ${messageId}`,
    `References: ${messageId}`,
    "Content-Type: text/plain; charset=utf-8",
    "MIME-Version: 1.0",
    "",
    body,
  ].join("\r\n");

  const encodedMessage = Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const res = await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: encodedMessage,
      threadId,
    },
  });

  return res.data;
}