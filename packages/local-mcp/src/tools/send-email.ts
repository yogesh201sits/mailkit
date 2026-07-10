import { z } from "zod";
import { sendEmail } from "@mailkit/core";
import { server } from "../server";

server.registerTool(
  "send_email",
  {
    description: "Send a new email.",
    inputSchema: {
      to: z.string().email(),
      subject: z.string(),
      body: z.string(),
    },
  },
  async ({ to, subject, body }) => {
    try {
      const result = await sendEmail({
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
                : "Failed to send email",
          },
        ],
      };
    }
  }
);