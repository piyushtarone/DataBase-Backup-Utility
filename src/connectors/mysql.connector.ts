import mysql, { Connection } from 'mysql2/promise';

export interface MySQLConfig {
  host: string;
  port?: number;
  user: string;
  password: string;
  database: string;
}

export class MySQLConnector {
  private config: MySQLConfig;
  private connection: Connection | null = null;

  constructor(config: MySQLConfig) {
    this.config = {
      port: 3306,
      ...config,
    };
  }

  /**
   * Create a database connection
   */
  async connect(): Promise<Connection> {
    if (this.connection) {
      return this.connection;
    }

    this.connection = await mysql.createConnection({
      host: this.config.host,
      port: this.config.port,
      user: this.config.user,
      password: this.config.password,
      database: this.config.database,
    });

    return this.connection;
  }

  /**
   * Test database connectivity
   */
  async testConnection(): Promise<boolean> {
    try {
      const conn = await this.connect();
      await conn.query('SELECT 1');
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Close database connection
   */
  async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.end();
      this.connection = null;
    }
  }
}
