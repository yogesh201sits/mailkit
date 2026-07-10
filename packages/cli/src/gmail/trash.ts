import { gmail } from "./client";

export async function trashEmail(id: string) {
  const res = await gmail.users.messages.trash({
    userId: "me",
    id,
  });

  return res.data;
}