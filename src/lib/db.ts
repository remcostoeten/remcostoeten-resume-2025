import { Pool } from 'pg'

declare global {
	// eslint-disable-next-line no-var
	var __resumePgPool: Pool | undefined
}

export function getPool(): Pool | null {
	const connectionString = process.env.DATABASE_URL
	if (!connectionString) return null

	if (globalThis.__resumePgPool) return globalThis.__resumePgPool

	const sslEnv = process.env.PG_SSL?.toLowerCase()
	let ssl: boolean | { rejectUnauthorized: boolean } | undefined

	if (sslEnv === 'false' || sslEnv === '0' || sslEnv === 'disable') {
		ssl = false
	} else if (sslEnv === 'no-verify') {
		ssl = { rejectUnauthorized: false }
	} else if (sslEnv === 'true' || sslEnv === '1' || sslEnv === 'require') {
		ssl = true
	} else {
		// let `pg` infer SSL from the connection string / environment
		ssl = undefined
	}

	const pool = new Pool({
		connectionString,
		ssl,
	})

	pool.on('error', (err) => {
		console.error('[PgPool] Unexpected error on idle client', err)
	})

	globalThis.__resumePgPool = pool
	return pool
}
