import { z } from "zod";
import { createLabel } from "@mailkit/core";
import { server } from "../server";

server.registerTool(
  "create_label",
  {
    description: "Create a new Gmail label.",
    inputSchema: {
      name: z.string(),
    },
  },
  async ({ name }) => {
    try {
      const label = await createLabel(name);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(label, null, 2),
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
                : "Failed to create label",
          },
        ],
      };
    }
  }
);