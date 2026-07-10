import { gmail } from "./client";

export async function readEmail(id: string) {
  const res = await gmail.users.messages.get({
    userId: "me",
    id,
    format: "full",
  });

  const headers = res.data.payload?.headers ?? [];

  const getHeader = (name: string) =>
    headers.find((h) => h.name === name)?.value ?? "";

  return {
    id: res.data.id,
    threadId: res.data.threadId,
    from: getHeader("From"),
    to: getHeader("To"),
    subject: getHeader("Subject"),
    date: getHeader("Date"),
    snippet: res.data.snippet,
    payload: res.data.payload,
  };
}