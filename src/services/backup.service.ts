// import { MySQLDumpService } from './mysql-dump.service.js';
import { MySQLDumpService } from './mysql-dump.service';

export type SupportedDB = 'mysql' | 'postgres';

export interface BackupResult {
  success: boolean;
  database: SupportedDB;
  timestamp: string;
  message: string;
}

export interface DBConnector {
  testConnection(): Promise<boolean>;
  disconnect(): Promise<void>;
}

export class BackupService {
  private dbType: SupportedDB;
  private connector: DBConnector;

  constructor(dbType: SupportedDB, connector: DBConnector) {
    this.dbType = dbType;
    this.connector = connector;
  }


async runBackup(): Promise<BackupResult> {
  const timestamp = new Date().toISOString();

  try {
    const isConnected = await this.connector.testConnection();

    if (!isConnected) {
      return {
        success: false,
        database: this.dbType,
        timestamp,
        message: 'Database connection failed',
      };
    }

    if (this.dbType === 'mysql') {
      const dumpService = new MySQLDumpService();

      const dumpPath = await dumpService.runDump({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'test_db',
        outputDir: './backups/mysql',
      });

      return {
        success: true,
        database: this.dbType,
        timestamp,
        message: `Backup created at ${dumpPath}`,
      };
    }

    // ✅ VERY IMPORTANT: handle postgres (even as placeholder)
    if (this.dbType === 'postgres') {
      return {
        success: false,
        database: this.dbType,
        timestamp,
        message: 'PostgreSQL backup not implemented yet',
      };
    }

    // safety fallback
    return {
      success: false,
      database: this.dbType,
      timestamp,
      message: 'Unsupported database type',
    };
  } catch (error) {
    return {
      success: false,
      database: this.dbType,
      timestamp,
      message: 'Unexpected error during backup',
    };
  } finally {
    await this.connector.disconnect();
  }
}


  /**
   * Runs a backup flow (skeleton version)
   */
//   async runBackup(): Promise<BackupResult> {
//     const timestamp = new Date().toISOString();

//     try {
//       const isConnected = await this.connector.testConnection();

//       if (this.dbType === 'mysql') {
//   const dumpService = new MySQLDumpService();

//   const dumpPath = await dumpService.runDump({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'test_db',
//     outputDir: './backups/mysql',
//   });

//   return {
//     success: true,
//     database: this.dbType,
//     timestamp,
//     message: `Backup created at ${dumpPath}`,
//   };
// }
//     } catch (error) {
//       return {
//         success: false,
//         database: this.dbType,
//         timestamp,
//         message: 'Unexpected error during backup',
//       };
//     } finally {
//       await this.connector.disconnect();
//     }
//   }
}
