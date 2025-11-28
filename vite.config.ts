import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],

	// Performance optimizations
	build: {
		// Optimize chunks for better caching
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ['svelte']
				}
			}
		},

		// Enable CSS minification
		cssMinify: true,

		// Optimize assets
		assetsInlineLimit: 4096
	},

	// Development server optimization
	server: {
		fs: {
			allow: ['..']
		}
	},

	// Preview server optimization
	preview: {
		port: 4173
	},

	// Define global constants for build-time optimization
	define: {
		__BUILD_DATE__: JSON.stringify(new Date().toISOString())
	}
});