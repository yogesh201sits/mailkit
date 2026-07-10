import { createGmailError, gmail } from "./client";

export async function listLabels() {
  try {
    const res = await gmail.users.labels.list({
      userId: "me",
    });

    return res.data.labels ?? [];
  } catch (error) {
    throw createGmailError("listing labels", error);
  }
}