// Service Worker for caching and offline support
const CACHE_NAME = 'resume-v1';
const STATIC_CACHE_NAME = 'resume-static-v1';
const DYNAMIC_CACHE_NAME = 'resume-dynamic-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
	'/',
	'/app.css',
	'/favicon.svg',
	'/favicon.png',
	'/manifest.json',
	// Add other critical assets
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(STATIC_CACHE_NAME)
			.then((cache) => {
				console.log('Caching static assets');
				return cache.addAll(STATIC_ASSETS);
			})
	);
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
						console.log('Deleting old cache:', cacheName);
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
	const { request } = event;

	// Skip non-GET requests
	if (request.method !== 'GET') return;

	// Skip external requests
	if (!request.url.startsWith(self.location.origin)) return;

	event.respondWith(
		caches.match(request).then((cachedResponse) => {
			// Serve from cache if available
			if (cachedResponse) {
				return cachedResponse;
			}

			// Otherwise, fetch from network
			return fetch(request).then((response) => {
				// Don't cache non-successful responses
				if (!response || response.status !== 200 || response.type !== 'basic') {
					return response;
				}

				// Clone the response for caching
				const responseToCache = response.clone();

				// Cache dynamic assets
				if (shouldCache(request)) {
					event.waitUntil(
						caches.open(DYNAMIC_CACHE_NAME)
							.then((cache) => {
								cache.put(request, responseToCache);
							})
					);
				}

				return response;
			}).catch(() => {
				// Return offline fallback for HTML pages
				if (request.headers.get('accept')?.includes('text/html')) {
					return caches.match('/') || new Response('Offline', {
						status: 503,
						statusText: 'Service Unavailable'
					});
				}
			});
		})
	);
});

// Determine if a request should be cached
function shouldCache(request) {
	const url = new URL(request.url);

	// Cache static assets
	if (url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|woff|woff2)$/)) {
		return true;
	}

	// Cache pages
	if (request.headers.get('accept')?.includes('text/html')) {
		return true;
	}

	// Don't cache API calls or other dynamic content
	return false;
}

// Background sync for offline actions (if supported)
self.addEventListener('sync', (event) => {
	if (event.tag === 'background-sync') {
		event.waitUntil(doBackgroundSync());
	}
});

function doBackgroundSync() {
	// Handle any background sync tasks
	console.log('Background sync triggered');
	return Promise.resolve();
}

// Push notification handling (if implemented)
self.addEventListener('push', (event) => {
	if (event.data) {
		const options = {
			body: event.data.text(),
			icon: '/icon-192.png',
			badge: '/badge.png',
			vibrate: [100, 50, 100],
			data: {
				dateOfArrival: Date.now(),
				primaryKey: 1
			},
			actions: [
				{
					action: 'explore',
					title: 'Explore',
					icon: '/checkmark.png'
				},
				{
					action: 'close',
					title: 'Close',
					icon: '/xmark.png'
				}
			]
		};

		event.waitUntil(
			self.registration.showNotification('Resume Site', options)
		);
	}
});