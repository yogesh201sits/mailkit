import { z } from "zod";
import { searchEmails } from "@mailkit/core";
import { server } from "../server";

server.registerTool(
  "search_emails",
  {
    description: "Search Gmail emails using Gmail search syntax.",
    inputSchema: {
      query: z.string(),
      limit: z.number().optional(),
    },
  },
  async ({ query, limit }) => {
    try {
      const emails = await searchEmails(query, limit ?? 10);

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
                : "Failed to search emails",
          },
        ],
      };
    }
  }
);