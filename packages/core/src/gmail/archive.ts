import { createGmailError, gmail } from "./client";

export async function archiveEmail(id: string) {
  try {
    const res = await gmail.users.messages.modify({
      userId: "me",
      id,
      requestBody: {
        removeLabelIds: ["INBOX"],
      },
    });

    return res.data;
  } catch (error) {
    throw createGmailError("archiving email", error);
  }
}