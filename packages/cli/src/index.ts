import { Command } from "commander";

const program = new Command();

program
  .command("init")
  .description("Configure MailKit CLI")
  .requiredOption("--host <host>", "SMTP host")
  .requiredOption("--port <port>", "SMTP port")
  .requiredOption("--user <user>", "SMTP username")
  .requiredOption("--password <password>", "SMTP password")
  .action(async (options) => {
    console.log("Saving configuration...");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log(options);
    console.log("✅ Configuration complete.");
  });

await program.parseAsync(process.argv);