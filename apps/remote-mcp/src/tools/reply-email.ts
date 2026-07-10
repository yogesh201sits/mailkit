import { z } from "zod";
import { replyEmail } from "@mailkit/core";
import { server } from "../server";

server.registerTool(
  "reply_email",
  {
    description: "Reply to an existing email thread.",
    inputSchema: {
      threadId: z.string(),
      messageId: z.string(),
      to: z.string().email(),
      subject: z.string(),
      body: z.string(),
    },
  },
  async ({ threadId, messageId, to, subject, body }) => {
    try {
      const result = await replyEmail({
        threadId,
        messageId,
        to,
        subject,
        body,
      });

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
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
                : "Failed to reply to email",
          },
        ],
      };
    }
  }
);