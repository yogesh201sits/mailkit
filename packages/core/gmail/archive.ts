import { gmail } from "./client";

export async function archiveEmail(id: string) {
  const res = await gmail.users.messages.modify({
    userId: "me",
    id,
    requestBody: {
      removeLabelIds: ["INBOX"],
    },
  });

  return res.data;
}