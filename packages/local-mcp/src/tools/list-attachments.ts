import { z } from "zod";
import { listAttachments } from "@mailkit/core";
import { server } from "../server";

server.registerTool(
  "list_attachments",
  {
    description: "List all attachments for an email.",
    inputSchema: {
      messageId: z.string(),
    },
  },
  async ({ messageId }) => {
    try {
      const attachments = await listAttachments(messageId);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(attachments, null, 2),
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
                : "Failed to list attachments",
          },
        ],
      };
    }
  }
);