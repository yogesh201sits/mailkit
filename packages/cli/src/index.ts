import { Command } from "commander";
import {listEmails, readEmail, searchEmails, sendEmail, replyEmail, archiveEmail, trashEmail,
markAsRead, markAsUnread, starEmail, unstarEmail, createLabel, listAttachments,} from "@mailkit/core";

const program = new Command();

program
  .name("mailkit")
  .description("MailKit CLI")
  .version("0.1.0");

program
  .command("emails")
  .description("List recent emails")
  .option("-n, --max-results <count>", "Number of emails", "5")
  .action(async (options) => {
    const emails = await listEmails(Number(options.maxResults));

    for (const email of emails) {
      console.log(`[${email.date}] ${email.from}`);
      console.log(`Subject: ${email.subject}`);
      console.log();
    }
  });

program
  .command("read")
  .description("Read an email")
  .argument("<messageId>")
  .action(async (id) => {
    console.dir(await readEmail(id), { depth: null });
  });

program
  .command("search")
  .description("Search emails")
  .argument("<query>")
  .option("-n, --max-results <count>", "Number of emails", "5")
  .action(async (query, options) => {
    const emails = await searchEmails(query, Number(options.maxResults));
    console.dir(emails, { depth: null });
  });

program
  .command("send")
  .description("Send an email")
  .requiredOption("--to <email>")
  .requiredOption("--subject <subject>")
  .requiredOption("--body <body>")
  .action(async (options) => {
    const result = await sendEmail({
      to: options.to,
      subject: options.subject,
      body: options.body,
    });

    console.log(result);
  });

program
  .command("reply")
  .description("Reply to an email")
  .requiredOption("--thread-id <id>")
  .requiredOption("--message-id <id>")
  .requiredOption("--to <email>")
  .requiredOption("--subject <subject>")
  .requiredOption("--body <body>")
  .action(async (options) => {
    const result = await replyEmail({
      threadId: options.threadId,
      messageId: options.messageId,
      to: options.to,
      subject: options.subject,
      body: options.body,
    });

    console.log(result);
  });

program
  .command("archive")
  .description("Archive an email")
  .argument("<messageId>")
  .action(async (id) => {
    await archiveEmail(id);
    console.log("Archived.");
  });

program
  .command("trash")
  .description("Move an email to trash")
  .argument("<messageId>")
  .action(async (id) => {
    await trashEmail(id);
    console.log("Moved to trash.");
  });

program
  .command("read-status")
  .description("Mark email as read or unread")
  .argument("<messageId>")
  .requiredOption("--status <read|unread>")
  .action(async (id, options) => {
    if (options.status === "read") {
      await markAsRead(id);
    } else {
      await markAsUnread(id);
    }

    console.log("Updated.");
  });

program
  .command("star")
  .description("Star or unstar an email")
  .argument("<messageId>")
  .requiredOption("--action <star|unstar>")
  .action(async (id, options) => {
    if (options.action === "star") {
      await starEmail(id);
    } else {
      await unstarEmail(id);
    }

    console.log("Updated.");
  });


program
  .command("create-label")
  .description("Create a label")
  .argument("<name>")
  .action(async (name) => {
    console.log(await createLabel(name));
  });

program
  .command("attachments")
  .description("List attachments")
  .argument("<messageId>")
  .action(async (id) => {
    console.dir(await listAttachments(id), { depth: null });
  });

await program.parseAsync(process.argv);