import { gmail } from "./client";

export async function createLabel(name: string) {
  const res = await gmail.users.labels.create({
    userId: "me",
    requestBody: {
      name,
    },
  });

  return res.data;
}