import { z } from "zod";
import { markAsUnread } from "@mailkit/core";
import { server } from "../server";

server.registerTool(
  "mark_as_unread",
  {
    description: "Mark an email as unread.",
    inputSchema: {
      messageId: z.string(),
    },
  },
  async ({ messageId }) => {
    try {
      await markAsUnread(messageId);

      return {
        content: [
          {
            type: "text",
            text: "Email marked as unread successfully.",
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
                : "Failed to mark email as unread",
          },
        ],
      };
    }
  }
);