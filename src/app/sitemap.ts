import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = 'https://remcos.cv'

	return [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1
		},
		{
			url: `${baseUrl}/manifest.webmanifest`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.3
		},
		{
			url: `${baseUrl}/sitemap.xml`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.3
		}
	]
}
