<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';

	interface Props {
		data: {
			resume: import('$lib/types/resume').Resume;
			structuredData: Record<string, any>;
		};
		children: any;
	}

	let { data, children }: Props = $props();

	let title = $derived(`${data.resume.basics.name} - ${data.resume.basics.title}`);

	$effect(() => {
		if (typeof document !== 'undefined') {
			document.title = title;

			// Update or create meta description
			let metaDesc = document.querySelector('meta[name="description"]');
			if (!metaDesc) {
				metaDesc = document.createElement('meta');
				metaDesc.setAttribute('name', 'description');
				document.head.appendChild(metaDesc);
			}
			metaDesc.setAttribute('content', data.resume.summary[0]);

			// Update or create meta keywords
			let metaKeywords = document.querySelector('meta[name="keywords"]');
			if (!metaKeywords) {
				metaKeywords = document.createElement('meta');
				metaKeywords.setAttribute('name', 'keywords');
				document.head.appendChild(metaKeywords);
			}
			const keywords = [
				...data.resume.skills.languages,
				...data.resume.skills.frameworks,
				...data.resume.skills.styling,
				...data.resume.skills.backend,
				...data.resume.skills.databases
			].slice(0, 10).join(', ');
			metaKeywords.setAttribute('content', keywords);
		}
	});

	// Generate structured data script
	const structuredDataScript = {
		type: 'application/ld+json',
		innerHTML: JSON.stringify(data.structuredData, null, 2)
	};

	// Generate sitemap routes (for static generation)
	const sitemapRoutes = [
		{ url: '/', changefreq: 'monthly', priority: 1.0 },
		{ url: '/#experience', changefreq: 'monthly', priority: 0.9 },
		{ url: '/#projects', changefreq: 'monthly', priority: 0.8 },
		{ url: '/#skills', changefreq: 'monthly', priority: 0.7 },
		{ url: '/#education', changefreq: 'yearly', priority: 0.6 }
	];
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<meta name="title" content={title} />
	<meta name="description" content={data.resume.summary[0]} />
	<meta name="keywords" content={data.resume.skills.languages.slice(0, 10).join(', ')} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={data.resume.basics.site} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={data.resume.summary[0]} />
	<meta property="og:image" content={`${data.resume.basics.site}/og-image.jpg`} />
	<meta property="og:image:alt" content={`${data.resume.basics.name} - Professional Resume`} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={data.resume.basics.site} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={data.resume.summary[0]} />
	<meta property="twitter:image" content={`${data.resume.basics.site}/og-image.jpg`} />

	<!-- Additional SEO Meta Tags -->
	<meta name="author" content={data.resume.basics.name} />
	<meta name="robots" content="index, follow" />
	<meta name="language" content="English" />
	<meta name="generator" content="SvelteKit" />

	<!-- Canonical URL -->
	<link rel="canonical" href={data.resume.basics.site} />

	<!-- Structured Data -->
	<script {...structuredDataScript}></script>

	<!-- Favicon and Icons -->
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
	<link rel="icon" type="image/png" href="/favicon.png" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />

	<!-- Manifest for PWA -->
	<link rel="manifest" href="/manifest.json" />

	<!-- Theme Color -->
	<meta name="theme-color" content="#3b82f6" />

	<!-- Viewport and Mobile Optimization -->
	<meta name="mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="default" />

	<!-- Preconnect for external resources -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />

	<!-- Inter font from Google Fonts -->
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
</svelte:head>

<!-- Main layout wrapper -->
<div class="min-h-screen bg-white print:bg-white">
	<!-- Skip to main content link (first focusable element) -->
	<a
		href="#main-content"
		class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 z-50"
	>
		Skip to main content
	</a>

	<!-- Main content area -->
	<main id="main-content" class="container mx-auto px-6 py-10 max-w-4xl print:max-w-none print:p-0">
		{@render children()}
	</main>
</div>

<!-- Accessibility announcement region for screen readers -->
<div aria-live="polite" aria-atomic="true" class="sr-only"></div>

<!-- Loading indicator for better UX -->
<div
	class="fixed top-0 left-0 w-full h-1 bg-blue-600 transform -translate-x-full transition-transform duration-300 ease-out z-50"
	role="progressbar"
	aria-label="Loading"
	aria-valuenow="0"
	aria-valuemin="0"
	aria-valuemax="100"
></div>