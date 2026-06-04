/**
 * Zero Lines Academy — Service Worker
 * Provides offline caching for all static assets.
 */

const CACHE_NAME = 'zero-lines-v2';

// Use self.location.pathname to detect the base path (e.g., /zero-lines-academy/)
const BASE = self.location.pathname.replace(/sw\.js$/, '').replace(/\/$/, '') || '';

const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './logo-blue.png',
  './logo-white.png',
  './logo-nav.png',
  './hero-glow.png',
  './onboarding-1.png',
  './onboarding-2.png',
  './onboarding-3.png',
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

// Fetch: cache-first strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // For static assets — try cache first, fall back to network
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        // Cache successful GET responses
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      }).catch(() => {
        // If both cache and network fail, return cached index.html for navigation
        if (request.destination === 'document') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
