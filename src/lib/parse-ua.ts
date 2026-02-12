export type ParsedUA = {
	browser: string
	browserVersion: string
	os: string
	osVersion: string
}

export function parseUserAgent(ua: string): ParsedUA {
	const result: ParsedUA = {
		browser: 'Unknown',
		browserVersion: '',
		os: 'Unknown',
		osVersion: '',
	}

	if (!ua) return result

	let match: RegExpMatchArray | null

	// Browser detection (order matters: check specific browsers before generic ones)
	if ((match = ua.match(/Edg\/(\d+[\d.]*)/))) {
		result.browser = 'Edge'
		result.browserVersion = match[1]
	} else if (
		(match = ua.match(/OPR\/(\d+[\d.]*)/)) ||
		(match = ua.match(/Opera\/(\d+[\d.]*)/))
	) {
		result.browser = 'Opera'
		result.browserVersion = match[1]
	} else if ((match = ua.match(/Chrome\/(\d+[\d.]*)/)) && !/Chromium/.test(ua)) {
		result.browser = 'Chrome'
		result.browserVersion = match[1]
	} else if ((match = ua.match(/Firefox\/(\d+[\d.]*)/))) {
		result.browser = 'Firefox'
		result.browserVersion = match[1]
	} else if (/Safari/.test(ua) && (match = ua.match(/Version\/(\d+[\d.]*)/))) {
		result.browser = 'Safari'
		result.browserVersion = match[1]
	} else if (
		(match = ua.match(/MSIE (\d+[\d.]*)/)) ||
		(match = ua.match(/Trident.*rv:(\d+[\d.]*)/))
	) {
		result.browser = 'IE'
		result.browserVersion = match[1]
	}

	// OS detection
	if ((match = ua.match(/Windows NT ([\d.]+)/))) {
		result.os = 'Windows'
		const winMap: Record<string, string> = {
			'10.0': '10/11',
			'6.3': '8.1',
			'6.2': '8',
			'6.1': '7',
			'6.0': 'Vista',
		}
		result.osVersion = winMap[match[1]] || match[1]
	} else if ((match = ua.match(/Mac OS X ([\d._]+)/))) {
		result.os = 'macOS'
		result.osVersion = match[1].replace(/_/g, '.')
	} else if ((match = ua.match(/Android ([\d.]+)/))) {
		result.os = 'Android'
		result.osVersion = match[1]
	} else if ((match = ua.match(/(?:iPhone|iPad).*OS ([\d_]+)/))) {
		result.os = 'iOS'
		result.osVersion = match[1].replace(/_/g, '.')
	} else if (/CrOS/.test(ua)) {
		result.os = 'ChromeOS'
	} else if (/Linux/.test(ua)) {
		result.os = 'Linux'
	}

	return result
}
