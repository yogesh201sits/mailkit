import { z } from "zod";
import { starEmail } from "@mailkit/core";
import { server } from "../server";

server.registerTool(
  "star_email",
  {
    description: "Star an email.",
    inputSchema: {
      messageId: z.string(),
    },
  },
  async ({ messageId }) => {
    try {
      await starEmail(messageId);

      return {
        content: [
          {
            type: "text",
            text: "Email starred successfully.",
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
                : "Failed to star email",
          },
        ],
      };
    }
  }
);