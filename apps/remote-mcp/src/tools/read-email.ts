import { z } from "zod";
import { readEmail } from "@mailkit/core";
import { server } from "../server";

server.registerTool(
  "read_email",
  {
    description: "Read a Gmail email by its message ID.",
    inputSchema: {
      messageId: z.string(),
    },
  },
  async ({ messageId }) => {
    try {
      const email = await readEmail(messageId);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(email, null, 2),
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
                : "Failed to read email",
          },
        ],
      };
    }
  }
);