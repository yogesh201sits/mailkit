import { createGmailError, gmail } from "./client";

export async function trashEmail(id: string) {
  try {
    const res = await gmail.users.messages.trash({
      userId: "me",
      id,
    });

    return res.data;
  } catch (error) {
    throw createGmailError("trashing email", error);
  }
}