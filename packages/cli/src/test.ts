import { gmail } from "./gmail/client";
import { listEmails } from "./gmail/list";



const emails = await listEmails();

console.log(emails);