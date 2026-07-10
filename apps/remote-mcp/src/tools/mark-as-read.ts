import { z } from "zod";
import { markAsRead } from "@mailkit/core";
import { server } from "../server";

server.registerTool(
  "mark_as_read",
  {
    description: "Mark an email as read.",
    inputSchema: {
      messageId: z.string(),
    },
  },
  async ({ messageId }) => {
    try {
      await markAsRead(messageId);

      return {
        content: [
          {
            type: "text",
            text: "Email marked as read successfully.",
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
                : "Failed to mark email as read",
          },
        ],
      };
    }
  }
);