import { createGmailError, gmail } from "./client";

interface AttachmentInfo {
  filename: string;
  mimeType: string;
  attachmentId: string;
  size: number;
}

function findAttachments(
  parts: any[] = []
): AttachmentInfo[] {
  const attachments: AttachmentInfo[] = [];

  for (const part of parts) {
    if (
      part.filename &&
      part.body?.attachmentId
    ) {
      attachments.push({
        filename: part.filename,
        mimeType: part.mimeType,
        attachmentId: part.body.attachmentId,
        size: part.body.size,
      });
    }

    if (part.parts) {
      attachments.push(
        ...findAttachments(part.parts)
      );
    }
  }

  return attachments;
}

export async function listAttachments(
  messageId: string
) {
  try {
    const res = await gmail.users.messages.get({
      userId: "me",
      id: messageId,
      format: "full",
    });

    return findAttachments(
      res.data.payload?.parts ?? []
    );
  } catch (error) {
    throw createGmailError("listing attachments", error);
  }
}

export async function downloadAttachment(
  messageId: string,
  attachmentId: string
) {
  try {
    const res =
      await gmail.users.messages.attachments.get({
        userId: "me",
        messageId,
        id: attachmentId,
      });

    return Buffer.from(
      res.data.data!,
      "base64"
    );
  } catch (error) {
    throw createGmailError("downloading attachment", error);
  }
}