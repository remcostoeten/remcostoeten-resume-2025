'use client'

import { useEffect, useCallback, useRef } from 'react'

const ENDPOINT = '/api/visitor'
const SESSION_KEY = '__vt_sid'
const SESSION_STARTED_KEY = '__vt_started'

// ---------------------------------------------------------------------------
// Session ID management (persists per tab via sessionStorage)
// ---------------------------------------------------------------------------

function generateSessionId(): string {
	if (typeof crypto !== 'undefined' && crypto.randomUUID) {
		return crypto.randomUUID()
	}
	return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function getSessionId(): string {
	if (typeof window === 'undefined') return ''
	let sid = sessionStorage.getItem(SESSION_KEY)
	if (!sid) {
		sid = generateSessionId()
		sessionStorage.setItem(SESSION_KEY, sid)
	}
	return sid
}

// ---------------------------------------------------------------------------
// Canvas fingerprint – draws shapes/text and hashes the pixel output.
// Different GPUs / renderers produce subtly different results, making this
// a strong device-level signal that doesn't rely on cookies or IP.
// ---------------------------------------------------------------------------

function getCanvasFingerprint(): string {
	try {
		const canvas = document.createElement('canvas')
		canvas.width = 256
		canvas.height = 128
		const ctx = canvas.getContext('2d')
		if (!ctx) return ''

		ctx.fillStyle = '#f60'
		ctx.fillRect(125, 1, 62, 20)
		ctx.fillStyle = '#069'
		ctx.font = '11pt Arial'
		ctx.fillText('Cwm fjord bank glyphs vext quiz', 2, 15)
		ctx.fillStyle = 'rgba(102, 204, 0, 0.7)'
		ctx.font = '18pt Arial'
		ctx.fillText('Cwm fjord bank glyphs vext quiz', 4, 45)
		ctx.globalCompositeOperation = 'multiply'
		ctx.fillStyle = 'rgb(255,0,255)'
		ctx.beginPath()
		ctx.arc(50, 50, 50, 0, Math.PI * 2, true)
		ctx.closePath()
		ctx.fill()
		ctx.fillStyle = 'rgb(0,255,255)'
		ctx.beginPath()
		ctx.arc(100, 50, 50, 0, Math.PI * 2, true)
		ctx.closePath()
		ctx.fill()

		const dataUrl = canvas.toDataURL()
		// cyrb53-style hash – fast, low-collision, non-crypto
		let h1 = 0xdeadbeef
		let h2 = 0x41c6ce57
		for (let i = 0; i < dataUrl.length; i++) {
			const ch = dataUrl.charCodeAt(i)
			h1 = Math.imul(h1 ^ ch, 2654435761)
			h2 = Math.imul(h2 ^ ch, 1597334677)
		}
		h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507)
		h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909)
		h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507)
		h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909)

		return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36)
	} catch {
		return ''
	}
}

// ---------------------------------------------------------------------------
// WebGL renderer info – identifies the GPU, very stable per device
// ---------------------------------------------------------------------------

function getWebGLInfo(): { renderer: string; vendor: string } {
	try {
		const canvas = document.createElement('canvas')
		const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
		if (!gl || !(gl instanceof WebGLRenderingContext)) return { renderer: '', vendor: '' }

		const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
		if (!debugInfo) return { renderer: '', vendor: '' }

		return {
			renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '',
			vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || '',
		}
	} catch {
		return { renderer: '', vendor: '' }
	}
}

// ---------------------------------------------------------------------------
// Collect all client-side fingerprint signals
// ---------------------------------------------------------------------------

function collectFingerprint() {
	const webgl = getWebGLInfo()
	const nav = navigator as Navigator & { deviceMemory?: number }

	return {
		screenWidth: screen.width,
		screenHeight: screen.height,
		colorDepth: screen.colorDepth,
		timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		language: navigator.language,
		platform: navigator.platform,
		hardwareConcurrency: navigator.hardwareConcurrency || 0,
		deviceMemory: nav.deviceMemory || 0,
		maxTouchPoints: navigator.maxTouchPoints || 0,
		webglRenderer: webgl.renderer,
		webglVendor: webgl.vendor,
		canvasHash: getCanvasFingerprint(),
	}
}

// ---------------------------------------------------------------------------
// Fire-and-forget POST via sendBeacon (falls back to fetch + keepalive)
// ---------------------------------------------------------------------------

function send(payload: Record<string, unknown>) {
	try {
		const body = JSON.stringify(payload)
		if (navigator.sendBeacon) {
			navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'application/json' }))
			return
		}
		fetch(ENDPOINT, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body,
			keepalive: true,
		}).catch(() => {})
	} catch {
		// tracking must never break the page
	}
}

// ---------------------------------------------------------------------------
// React hook – auto-tracks session lifecycle on mount
// ---------------------------------------------------------------------------

export function useVisitorTracking() {
	const mountedRef = useRef(false)
	const startTimeRef = useRef(Date.now())

	useEffect(() => {
		if (mountedRef.current) return
		mountedRef.current = true

		const sessionId = getSessionId()
		const fingerprint = collectFingerprint()
		const isNewSession = !sessionStorage.getItem(SESSION_STARTED_KEY)

		// session_start doubles as the first page_view and increments
		// the visitor's visit_count on the server via UPSERT
		const event = isNewSession ? 'session_start' : 'page_view'

		if (isNewSession) {
			sessionStorage.setItem(SESSION_STARTED_KEY, '1')
		}

		send({
			event,
			path: window.location.pathname,
			referrer: document.referrer,
			sessionId,
			fingerprint,
			meta: isNewSession
				? { viewport: { width: window.innerWidth, height: window.innerHeight } }
				: undefined,
		})

		// Send session_end with duration when the tab is closed / navigated away
		let sessionEndSent = false
		const sendSessionEnd = () => {
			if (sessionEndSent) return
			sessionEndSent = true
			const durationMs = Date.now() - startTimeRef.current
			send({
				event: 'session_end',
				path: window.location.pathname,
				sessionId,
				durationMs,
				fingerprint,
			})
		}

		window.addEventListener('beforeunload', sendSessionEnd)

		return () => {
			window.removeEventListener('beforeunload', sendSessionEnd)
		}
	}, [])

	// Expose a function for other components to fire custom events
	// (e.g. download button calling trackEvent('resume_download'))
	const trackEvent = useCallback((eventType: string, meta?: Record<string, unknown>) => {
		const sessionId = getSessionId()
		const fingerprint = collectFingerprint()
		send({
			event: eventType,
			path: window.location.pathname,
			sessionId,
			fingerprint,
			meta,
		})
	}, [])

	return { trackEvent }
}

// ---------------------------------------------------------------------------
// Standalone function for use outside React (e.g. plain event handlers)
// ---------------------------------------------------------------------------

export function trackVisitorEvent(eventType: string, meta?: Record<string, unknown>) {
	if (typeof window === 'undefined') return
	const sessionId = getSessionId()
	const fingerprint = collectFingerprint()
	send({
		event: eventType,
		path: window.location.pathname,
		sessionId,
		fingerprint,
		meta,
	})
}
