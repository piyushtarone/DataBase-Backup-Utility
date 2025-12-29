import { Command } from "commander";
import { backupCommand, restoreCommand } from "./commands.js";

export const runCLI = () => {
  const program = new Command();

  program
    .name("db-backup")
    .description("CLI tool for database backup and restore")
    .version("0.1.0");

  program.addCommand(backupCommand);
  program.addCommand(restoreCommand);

  program.parse(process.argv);
};
