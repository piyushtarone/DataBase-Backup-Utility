import { exec } from 'child_process';
import { promisify } from 'util';
// import path from 'path';
// import fs from 'fs';
import * as fs from 'fs';
import * as path from 'path';

const execAsync = promisify(exec);

export interface MySQLDumpConfig {
  host: string;
  port?: number;
  user: string;
  password: string;
  database: string;
  outputDir: string;
}

export class MySQLDumpService {
  async runDump(config: MySQLDumpConfig): Promise<string> {
    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, '-');

    if (!fs.existsSync(config.outputDir)) {
      fs.mkdirSync(config.outputDir, { recursive: true });
    }

    const fileName = `${config.database}_${timestamp}.sql`;
    const filePath = path.join(config.outputDir, fileName);

    const command = [
      `mysqldump`,
      `-h ${config.host}`,
      `-P ${config.port ?? 3306}`,
      `-u ${config.user}`,
      `--password=${config.password}`,
      config.database,
      `> "${filePath}"`
    ].join(' ');

    try {
      await execAsync(command);
      return filePath;
    } catch (error) {
      throw new Error('MySQL dump failed');
    }
  }
}
