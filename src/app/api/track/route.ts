import { NextRequest } from 'next/server'
import { Pool } from 'pg'
import crypto from 'crypto'

type TrackPayload = {
	event?: string
	path?: string
	referrer?: string
	resumeVersion?: string
	meta?: Record<string, unknown>
}

const pool =
	globalThis.__resumePgPool ||
	new Pool({
		connectionString: process.env.DATABASE_URL,
		ssl: { rejectUnauthorized: false }
	})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(globalThis as any).__resumePgPool = pool

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
		const ipHash = hashIp(getClientIp(req))

		const country =
			header(req, 'x-vercel-ip-country') || header(req, 'cf-ipcountry') || ''
		const region =
			header(req, 'x-vercel-ip-country-region') ||
			header(req, 'x-vercel-ip-region') ||
			header(req, 'cf-region') ||
			''
		const city = header(req, 'x-vercel-ip-city') || header(req, 'cf-ipcity') || ''
		const deviceType = getDeviceType(ua)

		await pool.query(
			`
				INSERT INTO resume
					(event, path, referrer, ua, lang, ip_hash, country, region, city, device_type, resume_version, meta)
				VALUES
					($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
			`,
			[
				event,
				path,
				referrer,
				ua,
				lang,
				ipHash,
				country,
				region,
				city,
				deviceType,
				resumeVersion,
				JSON.stringify(meta)
			]
		)

		return new Response(null, { status: 204 })
	} catch {
		return new Response(null, { status: 204 })
	}
}
