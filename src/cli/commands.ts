import { Command } from "commander";
import { runFullBackup } from "../backup/fullBackup.js";
import { runFullRestore } from "../restore/fullRestore.js";

export const backupCommand = new Command("backup")
  .description("Run full database backup")
  .action(async () => {
    await runFullBackup();
  });

export const restoreCommand = new Command("restore")
  .description("Restore database from backup file")
  .requiredOption("-f, --file <path>", "Backup file path")
  .action(async (options) => {
    await runFullRestore(options.file);
  });
