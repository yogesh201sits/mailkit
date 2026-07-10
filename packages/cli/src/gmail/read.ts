import { gmail } from "./client";

export async function readEmail(id: string) {
  const res = await gmail.users.messages.get({
    userId: "me",
    id,
  });

  return res.data;
}