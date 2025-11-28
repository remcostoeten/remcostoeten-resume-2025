import { resumeData } from '$lib/data/resume';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const baseUrl = resumeData.basics.site;

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<url>
		<loc>${baseUrl}</loc>
		<lastmod>${new Date().toISOString()}</lastmod>
		<changefreq>monthly</changefreq>
		<priority>1.0</priority>
	</url>
	<url>
		<loc>${baseUrl}/#experience</loc>
		<lastmod>${new Date().toISOString()}</lastmod>
		<changefreq>monthly</changefreq>
		<priority>0.9</priority>
	</url>
	<url>
		<loc>${baseUrl}/#projects</loc>
		<lastmod>${new Date().toISOString()}</lastmod>
		<changefreq>monthly</changefreq>
		<priority>0.8</priority>
	</url>
	<url>
		<loc>${baseUrl}/#skills</loc>
		<lastmod>${new Date().toISOString()}</lastmod>
		<changefreq>monthly</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>${baseUrl}/#education</loc>
		<lastmod>${new Date().toISOString()}</lastmod>
		<changefreq>yearly</changefreq>
		<priority>0.6</priority>
	</url>
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, max-age=86400' // Cache for 1 day
		}
	});
};