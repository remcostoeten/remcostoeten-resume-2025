import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	adapter: adapter(),

	// Enable SEO and performance optimizations
	kit: {
		// Generate service worker for PWA capabilities
		serviceWorker: {
			register: false
		},

		// Define prerendering strategy for static generation
		prerender: {
			handleMissingId: 'warn',
			entries: ['*']
		},
		alias: {
			'$lib': './src/lib',
			'$lib/*': './src/lib/*'
		}
	},

	// Enable Vite optimizations
	vitePlugin: {
		inspector: true,
		dynamicCompileOptions(filename, code) {
			if (typeof filename === 'string' && filename.endsWith('.svelte')) {
				return {
					css: 'injected',
					dev: true
				};
			}
		}
	}
};

export default config;