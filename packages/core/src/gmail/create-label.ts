import { createGmailError, gmail } from "./client";

export async function createLabel(name: string) {
  try {
    const res = await gmail.users.labels.create({
      userId: "me",
      requestBody: {
        name,
      },
    });

    return res.data;
  } catch (error) {
    throw createGmailError("creating label", error);
  }
}