/**
 * Performance optimization utilities for Core Web Vitals
 */

/**
 * Lazy load images with intersection observer
 */
export function lazyLoadImages(): void {
	const images = document.querySelectorAll('img[data-src]');

	const imageObserver = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const img = entry.target as HTMLImageElement;
					img.src = img.dataset.src!;
					img.classList.remove('lazy');
					observer.unobserve(img);
				}
			});
		},
		{
			rootMargin: '50px 0px',
			threshold: 0.01
		}
	);

	images.forEach(img => imageObserver.observe(img));
}

/**
 * Preload critical resources
 */
export function preloadCriticalResources(): void {
	const criticalResources = [
		{ href: '/favicon.svg', as: 'image', type: 'image/svg+xml' },
		{ href: '/manifest.json', as: 'fetch', type: 'application/json' }
	];

	criticalResources.forEach(resource => {
		const link = document.createElement('link');
		link.rel = 'preload';
		link.href = resource.href;
		if (resource.as) link.setAttribute('as', resource.as);
		if (resource.type) link.setAttribute('type', resource.type);
		document.head.appendChild(link);
	});
}

/**
 * Measure Core Web Vitals
 */
export function measureCoreWebVitals(): void {
	// Largest Contentful Paint (LCP)
	new PerformanceObserver((entryList) => {
		const entries = entryList.getEntries();
		const lastEntry = entries[entries.length - 1];
		console.log('LCP:', lastEntry.startTime);
	}).observe({ entryTypes: ['largest-contentful-paint'] });

	// First Input Delay (FID)
	new PerformanceObserver((entryList) => {
		const entries = entryList.getEntries();
		entries.forEach(entry => {
			const eventTimingEntry = entry as PerformanceEventTiming;
			console.log('FID:', eventTimingEntry.processingStart - eventTimingEntry.startTime);
		});
	}).observe({ entryTypes: ['first-input'] });

	// Cumulative Layout Shift (CLS)
	let clsValue = 0;
	new PerformanceObserver((entryList) => {
		const entries = entryList.getEntries();
		entries.forEach(entry => {
			if (!(entry as any).hadRecentInput) {
				clsValue += (entry as any).value;
			}
		});
		console.log('CLS:', clsValue);
	}).observe({ entryTypes: ['layout-shift'] });
}

/**
 * Optimize font loading
 */
export function optimizeFontLoading(): void {
	// Preload critical fonts
	const fontDisplay = 'swap';

	const link = document.createElement('link');
	link.rel = 'preload';
	link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=' + fontDisplay;
	link.as = 'style';
	document.head.appendChild(link);

	// Load fonts asynchronously
	const asyncFontLink = document.createElement('link');
	asyncFontLink.rel = 'stylesheet';
	asyncFontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=' + fontDisplay;
	document.head.appendChild(asyncFontLink);
}

/**
 * Prefetch next pages for faster navigation
 */
export function prefetchNextPages(): void {
	const pages = ['/experience', '/projects', '/skills', '/education'];

	pages.forEach(page => {
		const link = document.createElement('link');
		link.rel = 'prefetch';
		link.href = page;
		document.head.appendChild(link);
	});
}

/**
 * Implement service worker for caching
 */
export function registerServiceWorker(): void {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/sw.js')
			.then(registration => {
				console.log('SW registered: ', registration);
			})
			.catch(registrationError => {
				console.log('SW registration failed: ', registrationError);
			});
	}
}

/**
 * Minimize layout shifts by reserving space
 */
export function reserveSpaceForDynamicContent(): void {
	// Reserve space for images before they load
	document.querySelectorAll('img[data-src]').forEach(img => {
		const width = img.getAttribute('width');
		const height = img.getAttribute('height');
		if (width && height) {
			(img as HTMLElement).style.aspectRatio = `${width} / ${height}`;
		}
	});
}

/**
 * Debounce resize events to improve performance
 */
export function debounceResize(callback: Function, delay: number = 100): void {
	let timeoutId: number;

	const handleResize = () => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(callback, delay);
	};

	window.addEventListener('resize', handleResize);
}

/**
 * Optimize animations with requestAnimationFrame
 */
export function optimizeAnimations(): void {
	// Use will-change for animated elements
	const animatedElements = document.querySelectorAll('.transition-colors, .transform');
	animatedElements.forEach(element => {
		(element as HTMLElement).style.willChange = 'transform, opacity';
	});
}

/**
 * Generate critical CSS inline
 */
export function generateCriticalCSS(): string {
	return `
		/* Critical above-the-fold styles */
		.min-h-screen { min-height: 100vh; }
		.container { max-width: 56rem; margin: 0 auto; padding: 0 1rem; }
		.sr-only {
			position: absolute;
			width: 1px;
			height: 1px;
			padding: 0;
			margin: -1px;
			overflow: hidden;
			clip: rect(0, 0, 0, 0);
			white-space: nowrap;
			border: 0;
		}
	`;
}

/**
 * Initialize all performance optimizations
 */
export function initPerformanceOptimizations(): void {
	// Run immediately
	preloadCriticalResources();
	optimizeFontLoading();
	reserveSpaceForDynamicContent();
	generateCriticalCSS();

	// Run after DOM is loaded
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', () => {
			lazyLoadImages();
			prefetchNextPages();
			optimizeAnimations();
		});
	} else {
		lazyLoadImages();
		prefetchNextPages();
		optimizeAnimations();
	}

	// Register service worker
	registerServiceWorker();

	// Measure performance (development only)
	if (import.meta.env.DEV) {
		measureCoreWebVitals();
	}

	// Debounce resize events
	debounceResize(() => {
		// Handle responsive layout changes
	}, 100);
}