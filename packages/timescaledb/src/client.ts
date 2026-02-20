import { Pool, PoolConfig, QueryResult, QueryResultRow } from 'pg';
import { z } from 'zod';

export const TimescaleConfigSchema = z.object({
  connectionString: z.string().url(),
  ssl: z.boolean().default(true),
  max: z.number().default(20),
  idleTimeoutMillis: z.number().default(30000),
  connectionTimeoutMillis: z.number().default(2000),
});

export type TimescaleConfig = z.infer<typeof TimescaleConfigSchema>;

export class TimescaleClient {
  private pool: Pool;

  constructor(config: z.input<typeof TimescaleConfigSchema>) {
    const validatedConfig = TimescaleConfigSchema.parse(config);
    
    const poolConfig: PoolConfig = {
      connectionString: validatedConfig.connectionString,
      ssl: validatedConfig.ssl ? { rejectUnauthorized: false } : false,
      max: validatedConfig.max,
      idleTimeoutMillis: validatedConfig.idleTimeoutMillis,
      connectionTimeoutMillis: validatedConfig.connectionTimeoutMillis,
    };

    this.pool = new Pool(poolConfig);

    this.pool.on('error', (err) => {
      console.error('Unexpected error on idle TimescaleDB client', err);
    });
  }

  async query<T extends QueryResultRow = any>(
    text: string,
    params?: any[]
  ): Promise<QueryResult<T>> {
    const start = Date.now();
    try {
      const res = await this.pool.query<T>(text, params);
      const duration = Date.now() - start;
      // Optional: log query duration/metrics
      return res;
    } catch (error) {
      console.error('TimescaleDB Query Error:', { text, error });
      throw error;
    }
  }

  async getClient() {
    return await this.pool.connect();
  }

  async close() {
    await this.pool.end();
  }

  /**
   * TimescaleDB specific helper to create a hypertable
   * @param tableName Name of the table
   * @param timeColumn Name of the column used for partitioning by time
   * @param chunkTimeInterval The time interval for each chunk (e.g., '1 day', '7 days')
   */
  async createHypertable(tableName: string, timeColumn: string = 'time', chunkTimeInterval?: string) {
    try {
      const options = chunkTimeInterval ? `, chunk_time_interval => INTERVAL '${chunkTimeInterval}'` : '';
      await this.query(`SELECT create_hypertable('${tableName}', '${timeColumn}', if_not_exists => TRUE${options});`);
    } catch (error) {
      console.error(`Failed to create hypertable for ${tableName}:`, error);
      throw error;
    }
  }

  async dropHypertable(tableName: string, cascade: boolean = false) {
    await this.query(`DROP TABLE IF EXISTS ${tableName} ${cascade ? 'CASCADE' : ''};`);
  }

  /**
   * Helper for continuous aggregates (TimescaleDB specific)
   */
  async createContinuousAggregate(viewName: string, query: string) {
    await this.query(`
      CREATE MATERIALIZED VIEW ${viewName}
      WITH (timescaledb.continuous) AS
      ${query}
      WITH NO DATA;
    `);
  }
}
