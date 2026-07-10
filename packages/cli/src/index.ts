import { Command } from "commander";
import { listEmails } from "@mailkit/core";

const program = new Command();

program
  .name("mailkit").description("MailKit CLI")
  .command("emails")
  .description("List recent emails from Gmail")
  .option("-n, --max-results <count>", "Number of emails to fetch", "5")
  .action(async (options) => {
    try {
      const count = Number.parseInt(options.maxResults, 10);
      const emails = await listEmails(Number.isNaN(count) ? 5 : count);

      console.log(`Found ${emails.length} email(s).`);

      for (const email of emails) {
        console.log(`[${email.date}] ${email.from} - ${email.subject}`);
      }
    } catch (error) {
      console.error("Unable to fetch emails.");
      console.error(error instanceof Error ? error.message : error);
      process.exitCode = 1;
    }
  });

await program.parseAsync(process.argv);

// bun run packages/cli/src/index.ts emails --max-results 2