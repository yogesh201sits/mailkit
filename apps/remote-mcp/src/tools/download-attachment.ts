import { z } from "zod";
import { downloadAttachment } from "@mailkit/core";
import { server } from "../server";

server.registerTool(
  "download_attachment",
  {
    description: "Download an attachment from a Gmail email.",
    inputSchema: {
      messageId: z.string(),
      attachmentId: z.string(),
    },
  },
  async ({ messageId, attachmentId }) => {
    try {
      const attachment = await downloadAttachment(
        messageId,
        attachmentId
      );

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(attachment, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text:
              error instanceof Error
                ? error.message
                : "Failed to download attachment",
          },
        ],
      };
    }
  }
);