import type { gmail_v1 } from "googleapis";

export function getBody(
  payload?: gmail_v1.Schema$MessagePart
): string {
  if (!payload) return "";

  // Plain text
  if (
    payload.mimeType === "text/plain" &&
    payload.body?.data
  ) {
    return Buffer.from(payload.body.data, "base64")
      .toString("utf8");
  }

  // HTML
  if (
    payload.mimeType === "text/html" &&
    payload.body?.data
  ) {
    return Buffer.from(payload.body.data, "base64")
      .toString("utf8");
  }

  // Search child parts
  if (payload.parts) {
    for (const part of payload.parts) {
      const body = getBody(part);

      if (body) return body;
    }
  }

  return "";
}