import { listLabels } from "@mailkit/core";
import { server } from "../server";

server.registerTool(
  "list_labels",
  {
    description: "List all Gmail labels.",
    inputSchema: {},
  },
  async () => {
    try {
      const labels = await listLabels();

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(labels, null, 2),
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
                : "Failed to list labels",
          },
        ],
      };
    }
  }
);