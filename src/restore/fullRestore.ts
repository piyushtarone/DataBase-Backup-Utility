import fs from "fs";
import zlib from "zlib";
import path from "path";
import os from "os";
import { runShellCommand } from "../utils/shellExecutor.js";
import { config } from "../config/configLoader.js";
import { logger } from "../services/logger.service.js";

export const runFullRestore = async (backupFile: string) => {
  try {
    if (!fs.existsSync(backupFile)) {
      throw new Error("Backup file not found");
    }

    const sqlFile = backupFile.replace(".gz", "");

    // 1️⃣ Unzip backup
    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(backupFile)
        .pipe(zlib.createGunzip())
        .pipe(fs.createWriteStream(sqlFile))
        .on("finish", resolve)
        .on("error", reject);
    });

    logger.info("Backup file extracted", { sqlFile });

    // 2️⃣ Build restore command (Windows-safe)
    const isWindows = os.platform() === "win32";

    // const restoreCmd = isWindows
    //   ? `cmd /c type "${sqlFile}" | mysql -h ${config.host} -P ${config.port} -u ${config.user} ${
    //       config.password ? `-p${config.password}` : ""
    //     } ${config.database}`
    //   : `mysql -h ${config.host} -P ${config.port} -u ${config.user} ${
    //       config.password ? `-p${config.password}` : ""
    //     } ${config.database} < "${sqlFile}"`;

const restoreCmd = `cmd /c type "${sqlFile}" | mysql -h ${config.host} -P ${config.port} -u ${config.user} ${
  config.password ? `-p${config.password}` : ""
} ${config.database}`;


    logger.info("Starting restore");
    await runShellCommand(restoreCmd);

    // 3️⃣ Cleanup
    fs.unlinkSync(sqlFile);

    console.log("✅ Restore completed successfully");
    logger.info("Restore completed successfully");
  } catch (err: any) {
    logger.error("Restore failed", { error: err });
    console.error("❌ Restore failed:", err.message || err);
  }
};
