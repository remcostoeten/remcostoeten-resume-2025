import { Pool } from 'pg'

declare global {
	// eslint-disable-next-line no-var
	var __resumePgPool: Pool | undefined
}

export function getPool(): Pool | null {
	const connectionString = process.env.DATABASE_URL
	if (!connectionString) return null

	if (globalThis.__resumePgPool) return globalThis.__resumePgPool

	const isDev =
		process.env.NODE_ENV === 'development' || connectionString.includes('localhost')

	const pool = new Pool({
		connectionString,
		ssl: isDev ? { rejectUnauthorized: false } : true,
	})

	pool.on('error', (err) => {
		console.error('[PgPool] Unexpected error on idle client', err)
	})

	globalThis.__resumePgPool = pool
	return pool
}
