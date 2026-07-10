import { createGmailError, gmail } from "./client";

interface SendEmailOptions {
  to: string;
  subject: string;
  body: string;
}

export async function sendEmail({
  to,
  subject,
  body,
}: SendEmailOptions) {
  try {
    const message = [
      `To: ${to}`,
      "Content-Type: text/plain; charset=utf-8",
      "MIME-Version: 1.0",
      `Subject: ${subject}`,
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
      },
    });

    return res.data;
  } catch (error) {
    throw createGmailError("sending email", error);
  }
}