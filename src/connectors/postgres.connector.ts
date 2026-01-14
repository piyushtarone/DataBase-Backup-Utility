import { Client } from 'pg';

export interface PostgresConfig {
  host: string;
  port?: number;
  user: string;
  password: string;
  database: string;
}

export class PostgresConnector {
  private config: PostgresConfig;
  private client: Client | null = null;

  constructor(config: PostgresConfig) {
    this.config = {
      port: 5432,
      ...config,
    };
  }

  /**
   * Create PostgreSQL connection
   */
  async connect(): Promise<Client> {
    if (this.client) {
      return this.client;
    }

    this.client = new Client({
      host: this.config.host,
      port: this.config.port,
      user: this.config.user,
      password: this.config.password,
      database: this.config.database,
    });

    await this.client.connect();
    return this.client;
  }

  /**
   * Test database connectivity
   */
  async testConnection(): Promise<boolean> {
    try {
      const client = await this.connect();
      await client.query('SELECT 1');
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Close database connection
   */
  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.end();
      this.client = null;
    }
  }
}
