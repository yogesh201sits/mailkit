import { z } from "zod";
import { unstarEmail } from "@mailkit/core";
import { server } from "../server";

server.registerTool(
  "unstar_email",
  {
    description: "Remove the star from an email.",
    inputSchema: {
      messageId: z.string(),
    },
  },
  async ({ messageId }) => {
    try {
      await unstarEmail(messageId);

      return {
        content: [
          {
            type: "text",
            text: "Email unstarred successfully.",
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
                : "Failed to unstar email",
          },
        ],
      };
    }
  }
);