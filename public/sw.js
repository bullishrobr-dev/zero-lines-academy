/**
 * Zero Lines Academy — Service Worker
 *
 * Strategy:
 *   - Navigations / documents  → NETWORK FIRST, cache as fallback.
 *     This is what lets a deploy actually reach sellers. A cache-first document
 *     freezes users on whatever build they first loaded, forever.
 *   - Hashed build assets      → CACHE FIRST. Vite fingerprints these filenames,
 *     so a cached copy is immutable and can never be stale.
 *   - Everything else (images, fonts, manifest) → STALE WHILE REVALIDATE.
 *
 * Bump CACHE_VERSION on any change to this file to evict old caches.
 */

const CACHE_VERSION = 'v6';
const CACHE_NAME = `zero-lines-${CACHE_VERSION}`;

// Relative so the app still works when deployed under a sub-path
// (vite.config.ts uses `base: './'`).
const PRECACHE = ['./', './index.html', './manifest.json'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      // addAll() rejects the whole install if any single entry 404s.
      .then((cache) => Promise.allSettled(PRECACHE.map((u) => cache.add(u))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
      )
      .then(() => self.clients.claim())
  );
});

/** Immutable build output: Vite emits /assets/<name>-<hash>.<ext> */
function isHashedAsset(url) {
  return /\/assets\/.+-[A-Za-z0-9_-]{8,}\.(js|css|woff2?|png|jpg|svg)$/.test(url.pathname);
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // let the network handle cross-origin

  // 1. Documents & navigations — network first.
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((c) => c.put(request, copy)).catch(() => {});
          return response;
        })
        .catch(() =>
          caches
            .match(request)
            .then((cached) => cached || caches.match('./index.html'))
            .then((cached) => cached || Response.error())
        )
    );
    return;
  }

  // 2. Fingerprinted assets — cache first, they can never go stale.
  if (isHashedAsset(url)) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((c) => c.put(request, copy)).catch(() => {});
            return response;
          })
      )
    );
    return;
  }

  // 3. Everything else — stale while revalidate.
  if (['image', 'style', 'script', 'font', 'manifest'].includes(request.destination)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const network = fetch(request)
          .then((response) => {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((c) => c.put(request, copy)).catch(() => {});
            return response;
          })
          .catch(() => cached);
        return cached || network;
      })
    );
  }
});

/** Lets the app trigger an immediate update instead of waiting for a tab close. */
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
