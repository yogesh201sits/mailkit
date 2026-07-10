import { listEmails } from "./gmail/list";
import { readEmail } from "./gmail/read";
import { searchEmails } from "./gmail/search";
import { sendEmail } from "./gmail/send";

console.log("=== 1. LIST EMAILS ===");

const emails = await listEmails(5);

console.dir(emails, { depth: null });


console.log("\n=== 2. READ EMAIL ===");

if (emails.length > 0 && emails[0].id) {
  const email = await readEmail(emails[0].id);
  console.dir(email, { depth: null });
}


console.log("\n=== 3. SEARCH EMAILS ===");

const searchResults = await searchEmails(
  "from:leetcode",
  3
);

console.dir(searchResults, { depth: null });


console.log("\n=== 4. SEND EMAIL ===");

const sent = await sendEmail({
  to: "YOUR_EMAIL@gmail.com",
  subject: "MailKit Test Email",
  body: "Testing Gmail API integration from MailKit.",
});

console.dir(sent, { depth: null });


console.log("\n=== DONE ===");