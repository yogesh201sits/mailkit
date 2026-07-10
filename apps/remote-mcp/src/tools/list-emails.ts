import { z } from "zod";
import { listEmails } from "@mailkit/core";
import { server } from "../server";

server.registerTool(
  "list_emails",
  {
    description: "List recent Gmail emails",
    inputSchema: {
      limit: z.number().optional(),
    },
  },
  async ({ limit }) => {
    try {
      const emails = await listEmails(limit ?? 10);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(emails, null, 2),
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
                : "Failed to list emails",
          },
        ],
      };
    }
  }
);