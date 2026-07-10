import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "mailkit",
  version: "1.0.0",
});

server.registerTool(
  "list_emails",
  {
    description: "List emails",
    inputSchema: {
      limit: z.number().optional(),
    },
  },
  async ({ limit }) => {
    return {
      content: [
        {
          type: "text",
          text: `Listing ${limit ?? 10} emails`,
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);