import { gmail } from "./gmail/client";
import { listEmails } from "./gmail/list";

import { sendEmail } from "./gmail/send";

const result = await sendEmail({
  to: "jamdadeyogesh40@gmail.com",
  subject: "Hello from MailKit",
  body: "This email was sent using the Gmail API.",
});

console.log(result);