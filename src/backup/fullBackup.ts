import path from "path";
import fs from "fs-extra";
import { config } from "../config/configLoader.js";
import { runShellCommand } from "../utils/shellExecutor.js";
import { compressFile } from "../services/compression.service.js";
import { logger } from "../services/logger.service.js";

export const runFullBackup = async () => {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupDir = path.resolve("backups");
    const fileName = `${config.database}_${timestamp}.sql`;
    const filePath = path.join(backupDir, fileName);

    await fs.ensureDir(backupDir);

    // const dumpCmd = `mysqldump -h ${config.host} -P ${config.port} -u ${config.user} ${
    //   config.password ? `-p${config.password}` : ""
    // } ${config.database} > "${filePath}"`;

const dumpCmd = `mysqldump -h ${config.host} -P ${config.port} -u ${config.user} ${
  config.password ? `-p${config.password}` : ""
} ${config.database} > "${filePath}"`;


    logger.info("Starting database backup");
    await runShellCommand(dumpCmd);

    // ✅ SAFETY CHECK
    if (!(await fs.pathExists(filePath))) {
      throw new Error("Backup file was not created. mysqldump failed.");
    }

    const compressedFile = await compressFile(filePath);
    await fs.remove(filePath);

    logger.info("Backup completed", { file: compressedFile });
    console.log("✅ Backup successful:", compressedFile);
  } catch (err: any) {
    logger.error("Backup failed", { error: err });
    console.error("❌ Backup failed:", err.message || err);
  }
};
