import { Pool, type PoolConfig, type QueryResultRow } from "pg";

type DbQueryParam = string | number | boolean | Date | null;

declare global {
  // Reuse the pool in dev hot-reload to avoid opening many connections.
  var __dbPool__: Pool | undefined;
}

function getDatabaseUrl(): string {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL nao definida. Configure no arquivo .env.local.");
  }

  return databaseUrl;
}

function createPool(): Pool {
  const isProd = process.env.NODE_ENV === "production";
  const ssl = process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false;

  const config: PoolConfig = {
    connectionString: getDatabaseUrl(),
    max: isProd ? 20 : 5,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
    ssl,
  };

  return new Pool(config);
}

export const db = globalThis.__dbPool__ ?? createPool();

if (process.env.NODE_ENV !== "production") {
  globalThis.__dbPool__ = db;
}

export async function dbQuery<T extends QueryResultRow>(
  text: string,
  params: DbQueryParam[] = [],
): Promise<T[]> {
  const result = await db.query<T>(text, params);
  return result.rows;
}

export async function testDbConnection(): Promise<boolean> {
  await db.query("SELECT 1");
  return true;
}
