import { NextRequest } from 'next/server'
import { Pool } from 'pg'
import crypto from 'crypto'

declare global {
	// eslint-disable-next-line no-var
	var __resumePgPool: Pool | undefined
}

type TrackPayload = {
	event?: string
	path?: string
	referrer?: string
	resumeVersion?: string
	meta?: Record<string, unknown>
}

/**
 * @reference
 * CREATE TABLE IF NOT EXISTS resume (
 *   id BIGSERIAL PRIMARY KEY,
 *   event TEXT NOT NULL,
 *   ts TIMESTAMPTZ NOT NULL DEFAULT now(),
 *   path TEXT,
 *   referrer TEXT,
 *   origin TEXT,
 *   host TEXT,
 *   is_localhost BOOLEAN,
 *   ua TEXT,
 *   lang TEXT,
 *   ip_hash TEXT,
 *   visitor_id TEXT,
 *   country TEXT,
 *   region TEXT,
 *   city TEXT,
 *   device_type TEXT,
 *   resume_version TEXT,
 *   meta JSONB
 * );
 */

const pool =
	globalThis.__resumePgPool ||
	new Pool({
		connectionString: process.env.DATABASE_URL,
		ssl:
			process.env.NODE_ENV === 'development' ||
			process.env.DATABASE_URL?.includes('localhost')
				? { rejectUnauthorized: false }
				: true
	})

globalThis.__resumePgPool = pool

function getClientIp(req: NextRequest) {
	const forwarded = req.headers.get('x-forwarded-for')
	if (forwarded) return forwarded.split(',')[0]?.trim() || ''
	return (
		req.headers.get('x-real-ip') ||
		req.headers.get('cf-connecting-ip') ||
		req.headers.get('x-client-ip') ||
		''
	)
}

function hashIp(ip: string) {
	if (!ip) return ''
	const salt = process.env.TRACKING_SALT || ''
	return crypto.createHash('sha256').update(`${salt}:${ip}`).digest('hex')
}

function hashVisitorId(ip: string, ua: string, lang: string) {
	const salt = process.env.TRACKING_SALT
	if (!salt || !ip) return ''
	const raw = `${salt}:${ip}:${ua}:${lang}`
	return crypto.createHash('sha256').update(raw).digest('hex')
}

function getDeviceType(ua: string) {
	const uaLower = ua.toLowerCase()
	if (/(tablet|ipad|playbook|silk)|(android(?!.*mobile))/i.test(uaLower)) return 'tablet'
	if (/mobi|iphone|ipod|android.*mobile|blackberry|iemobile|opera mini/i.test(uaLower))
		return 'mobile'
	return 'desktop'
}

function header(req: NextRequest, name: string) {
	return req.headers.get(name) || ''
}

function isLocalhostHost(host: string) {
	if (!host) return false
	const normalized = host.toLowerCase()
	return (
		normalized.startsWith('localhost') ||
		normalized.startsWith('127.0.0.1') ||
		normalized.startsWith('[::1]')
	)
}

export async function POST(req: NextRequest) {
	try {
		if (!process.env.DATABASE_URL) {
			return new Response(null, { status: 204 })
		}

		const body = (await req.json().catch(() => ({}))) as TrackPayload
		const event = body.event || 'resume_download'
		const path = body.path || ''
		const referrer = body.referrer || ''
		const resumeVersion = body.resumeVersion || ''
		const meta = body.meta || {}

		const ua = header(req, 'user-agent')
		const lang = header(req, 'accept-language')
		const ip = getClientIp(req)
		const ipHash = hashIp(ip)
		const visitorId = hashVisitorId(ip, ua, lang)

		const country =
			header(req, 'x-vercel-ip-country') || header(req, 'cf-ipcountry') || ''
		const region =
			header(req, 'x-vercel-ip-country-region') ||
			header(req, 'x-vercel-ip-region') ||
			header(req, 'cf-region') ||
			''
		const city = header(req, 'x-vercel-ip-city') || header(req, 'cf-ipcity') || ''
		const deviceType = getDeviceType(ua)
		const origin = header(req, 'origin')
		const host = header(req, 'host')
		const isLocalhost = isLocalhostHost(host)

		await pool.query(
			`
				INSERT INTO resume
					(event, path, referrer, origin, host, is_localhost, ua, lang, ip_hash, visitor_id, country, region, city, device_type, resume_version, meta)
				VALUES
					($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
			`,
			[
				event,
				path,
				referrer,
				origin,
				host,
				isLocalhost,
				ua,
				lang,
				ipHash,
				visitorId,
				country,
				region,
				city,
				deviceType,
				resumeVersion,
				meta
			]
		)

		return new Response(null, { status: 204 })
	} catch {
		return new Response(null, { status: 204 })
	}
}
