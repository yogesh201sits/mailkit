import { Hono } from "hono";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";

import { server } from "./server";

// Register tools
import "./tools/list-emails";
import "./tools/read-email";
import "./tools/search-emails";
import "./tools/send-email";
import "./tools/reply-email";
import "./tools/archive-email";
import "./tools/trash-email";
import "./tools/mark-as-read";
import "./tools/mark-as-unread";
import "./tools/star-email";
import "./tools/unstar-email";
import "./tools/list-labels";
import "./tools/create-label";
import "./tools/list-attachments";
import "./tools/download-attachment";

const app = new Hono();

app.all("/mcp", async (c) => {
  try {
    const transport = new WebStandardStreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: true,
    });

    await server.connect(transport);

    return transport.handleRequest(c.req.raw);
  } catch (err) {
    console.error(err);
    return c.text(String(err), 500);
  }
});

export default app;