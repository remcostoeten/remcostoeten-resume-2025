import { NextRequest } from 'next/server'
import crypto from 'crypto'
import { getPool } from '@/lib/db'
import { parseUserAgent } from '@/lib/parse-ua'

type ClientFingerprint = {
	screenWidth?: number
	screenHeight?: number
	colorDepth?: number
	timezone?: string
	language?: string
	platform?: string
	hardwareConcurrency?: number
	deviceMemory?: number
	maxTouchPoints?: number
	webglRenderer?: string
	webglVendor?: string
	canvasHash?: string
}

type VisitorPayload = {
	event: string
	path?: string
	referrer?: string
	sessionId?: string
	durationMs?: number
	fingerprint?: ClientFingerprint
	meta?: Record<string, unknown>
}

function getClientIp(req: NextRequest): string {
	const forwarded = req.headers.get('x-forwarded-for')
	if (forwarded) return forwarded.split(',')[0]?.trim() || ''
	return (
		req.headers.get('x-real-ip') ||
		req.headers.get('cf-connecting-ip') ||
		req.headers.get('x-client-ip') ||
		''
	)
}

function header(req: NextRequest, name: string): string {
	return req.headers.get(name) || ''
}

function hashIp(ip: string): string | null {
	const salt = process.env.TRACKING_SALT
	if (!salt || !ip) return null
	return crypto.createHash('sha256').update(`${salt}:${ip}`).digest('hex')
}

function getDeviceType(ua: string): string {
	const lower = ua.toLowerCase()
	if (/(tablet|ipad|playbook|silk)|(android(?!.*mobile))/i.test(lower)) return 'tablet'
	if (/mobi|iphone|ipod|android.*mobile|blackberry|iemobile|opera mini/i.test(lower))
		return 'mobile'
	return 'desktop'
}

/**
 * Build a stable fingerprint from device characteristics that rarely change.
 * Deliberately excludes IP address and browser version so that minor changes
 * (VPN, browser update) don't create a new visitor identity.
 */
function buildStableFingerprint(
	parsedUA: { browser: string; os: string },
	fp: ClientFingerprint
): string | null {
	const salt = process.env.TRACKING_SALT
	if (!salt) return null

	const components = [
		salt,
		parsedUA.browser,
		parsedUA.os,
		`${fp.screenWidth || 0}x${fp.screenHeight || 0}`,
		String(fp.colorDepth || ''),
		fp.timezone || '',
		fp.language || '',
		fp.platform || '',
		String(fp.hardwareConcurrency || ''),
		String(fp.deviceMemory || ''),
		String(fp.maxTouchPoints || ''),
		fp.webglRenderer || '',
		fp.canvasHash || '',
	]

	return crypto.createHash('sha256').update(components.join(':')).digest('hex')
}

/**
 * @reference
 * -- Run tools/sql/visitors.sql to create these tables:
 *
 * CREATE TABLE IF NOT EXISTS visitors (
 *   id BIGSERIAL PRIMARY KEY,
 *   fingerprint TEXT NOT NULL UNIQUE,
 *   first_seen TIMESTAMPTZ NOT NULL DEFAULT now(),
 *   last_seen TIMESTAMPTZ NOT NULL DEFAULT now(),
 *   visit_count INTEGER NOT NULL DEFAULT 1,
 *   device_type TEXT, os TEXT, os_version TEXT,
 *   browser TEXT, browser_version TEXT,
 *   screen_resolution TEXT, timezone TEXT, language TEXT,
 *   country TEXT, region TEXT, city TEXT,
 *   ip_hash TEXT, ua TEXT, meta JSONB
 * );
 *
 * CREATE TABLE IF NOT EXISTS visitor_events (
 *   id BIGSERIAL PRIMARY KEY,
 *   visitor_id BIGINT NOT NULL REFERENCES visitors(id),
 *   event_type TEXT NOT NULL,
 *   ts TIMESTAMPTZ NOT NULL DEFAULT now(),
 *   path TEXT, referrer TEXT, session_id TEXT,
 *   duration_ms INTEGER, meta JSONB
 * );
 */

export async function POST(req: NextRequest) {
	try {
		const pool = getPool()
		if (!pool) return new Response(null, { status: 204 })

		const body = (await req.json().catch(() => ({}))) as VisitorPayload
		const event = body.event || 'page_view'
		const path = body.path || ''
		const referrer = body.referrer || ''
		const sessionId = body.sessionId || ''
		const durationMs = body.durationMs ?? null
		const fp = body.fingerprint || {}
		const meta = body.meta && Object.keys(body.meta).length > 0 ? body.meta : null

		const ua = header(req, 'user-agent')
		const ip = getClientIp(req)
		const ipHash = hashIp(ip)
		const parsedUA = parseUserAgent(ua)
		const deviceType = getDeviceType(ua)

		const fingerprint = buildStableFingerprint(parsedUA, fp)
		if (!fingerprint) {
			console.warn('[Visitor] Missing TRACKING_SALT, skipping')
			return new Response(null, { status: 204 })
		}

		const country =
			header(req, 'x-vercel-ip-country') || header(req, 'cf-ipcountry') || ''
		const region =
			header(req, 'x-vercel-ip-country-region') ||
			header(req, 'x-vercel-ip-region') ||
			header(req, 'cf-region') ||
			''
		const city = header(req, 'x-vercel-ip-city') || header(req, 'cf-ipcity') || ''
		const screenResolution =
			fp.screenWidth && fp.screenHeight ? `${fp.screenWidth}x${fp.screenHeight}` : ''

		const client = await pool.connect()
		try {
			await client.query('BEGIN')

			// UPSERT visitor. Only increment visit_count for session_start events
			// to correctly count unique sessions rather than individual page hits.
			// The (xmax = 0) trick detects whether a row was inserted (new visitor)
			// or updated (returning visitor) without a separate query.
			const isSessionStart = event === 'session_start'

			const visitorResult = await client.query(
				`INSERT INTO visitors
					(fingerprint, device_type, os, os_version, browser, browser_version,
					 screen_resolution, timezone, language, country, region, city,
					 ip_hash, ua, meta)
				 VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
				 ON CONFLICT (fingerprint) DO UPDATE SET
					last_seen = now(),
					visit_count = visitors.visit_count + ${isSessionStart ? 1 : 0},
					ip_hash = EXCLUDED.ip_hash,
					ua = EXCLUDED.ua,
					country = CASE WHEN EXCLUDED.country != '' THEN EXCLUDED.country ELSE visitors.country END,
					region = CASE WHEN EXCLUDED.region != '' THEN EXCLUDED.region ELSE visitors.region END,
					city = CASE WHEN EXCLUDED.city != '' THEN EXCLUDED.city ELSE visitors.city END
				 RETURNING id`,
				[
					fingerprint,
					deviceType,
					parsedUA.os,
					parsedUA.osVersion,
					parsedUA.browser,
					parsedUA.browserVersion,
					screenResolution,
					fp.timezone || '',
					fp.language || header(req, 'accept-language'),
					country,
					region,
					city,
					ipHash,
					ua,
					meta,
				]
			)

			const visitorId = visitorResult.rows[0].id

			// Record the event
			await client.query(
				`INSERT INTO visitor_events
					(visitor_id, event_type, path, referrer, session_id, duration_ms, meta)
				 VALUES ($1,$2,$3,$4,$5,$6,$7)`,
				[visitorId, event, path, referrer, sessionId, durationMs, meta]
			)

			await client.query('COMMIT')
		} catch (err) {
			await client.query('ROLLBACK')
			throw err
		} finally {
			client.release()
		}

		return new Response(null, { status: 204 })
	} catch (err) {
		console.error('[visitor] failed to record', err)
		return new Response(null, { status: 204 })
	}
}
