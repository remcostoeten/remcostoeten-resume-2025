import { resumeData } from '$lib/data/resume';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const baseUrl = resumeData.basics.site;

	const robots = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Disallow temporary/development directories
Disallow: /tmp/
Disallow: /.git/
Disallow: /node_modules/

# Allow important assets
Allow: /static/
Allow: /favicon.svg
Allow: /favicon.png
Allow: /manifest.json
Allow: /resume.pdf
`;

	return new Response(robots, {
		headers: {
			'Content-Type': 'text/plain',
			'Cache-Control': 'public, max-age=86400' // Cache for 1 day
		}
	});
};