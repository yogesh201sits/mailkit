import { z } from "zod";
import { archiveEmail } from "@mailkit/core";
import { server } from "../server";

server.registerTool(
  "archive_email",
  {
    description: "Archive an email.",
    inputSchema: {
      messageId: z.string(),
    },
  },
  async ({ messageId }) => {
    try {
      await archiveEmail(messageId);

      return {
        content: [
          {
            type: "text",
            text: "Email archived successfully.",
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
                : "Failed to archive email",
          },
        ],
      };
    }
  }
);