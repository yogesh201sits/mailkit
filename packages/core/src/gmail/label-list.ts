import { gmail } from "./client";

export async function listLabels() {
  const res = await gmail.users.labels.list({
    userId: "me",
  });

  return res.data.labels ?? [];
}