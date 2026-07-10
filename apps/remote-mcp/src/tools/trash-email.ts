import { z } from "zod";
import { trashEmail } from "@mailkit/core";
import { server } from "../server";

server.registerTool(
  "trash_email",
  {
    description: "Move an email to the trash.",
    inputSchema: {
      messageId: z.string(),
    },
  },
  async ({ messageId }) => {
    try {
      await trashEmail(messageId);

      return {
        content: [
          {
            type: "text",
            text: "Email moved to trash successfully.",
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
                : "Failed to move email to trash",
          },
        ],
      };
    }
  }
);