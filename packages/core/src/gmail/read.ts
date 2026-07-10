import { createGmailError, gmail } from "./client";
import { getBody } from "./parser";

export async function readEmail(id: string) {
  try {
    const res = await gmail.users.messages.get({
      userId: "me",
      id,
      format: "full",
    });

    const headers = res.data.payload?.headers ?? [];

    function getHeader(name: string): string {
      return headers.find((h) => h.name === name)?.value ?? "";
    }

    return {
      id: res.data.id,
      threadId: res.data.threadId,
      from: getHeader("From"),
      to: getHeader("To"),
      cc: getHeader("Cc"),
      bcc: getHeader("Bcc"),
      subject: getHeader("Subject"),
      date: getHeader("Date"),
      snippet: res.data.snippet ?? "",
      body: getBody(res.data.payload),
      labelIds: res.data.labelIds ?? [],
      sizeEstimate: res.data.sizeEstimate,
      historyId: res.data.historyId,
      internalDate: res.data.internalDate,
    };
  } catch (error) {
    throw createGmailError("reading email", error);
  }
}