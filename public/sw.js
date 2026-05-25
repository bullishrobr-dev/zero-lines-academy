/**
 * Zero Lines Academy — Service Worker
 * Provides offline caching for all static assets.
 */

const CACHE_NAME = 'zero-lines-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo-blue.png',
  '/logo-white.png',
  '/logo-nav.png',
];

// Install: cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => {
      return self.skipWaiting();
    })
  );
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch: cache-first strategy for static assets, network-first for everything else
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip cross-origin requests
  if (!request.url.startsWith(self.location.origin)) return;

  // For JS/CSS/HTML — try cache first, fall back to network
  const isStaticAsset = request.destination === 'script' ||
                        request.destination === 'style' ||
                        request.destination === 'document' ||
                        request.destination === 'image' ||
                        request.destination === 'font';

  if (isStaticAsset) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          // Cache the fetched response
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        }).catch(() => {
          // If both cache and network fail, return cached index.html for navigation
          if (request.destination === 'document') {
            return caches.match('/index.html');
          }
        });
      })
    );
  }
});
