import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
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


const transport = new StdioServerTransport();

await server.connect(transport);