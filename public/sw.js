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
 * The boot JS and CSS are precached by name-discovery rather than by hand — see
 * shellAssetsFrom(). Without that the app hard white-screens on the first cold
 * start with no signal, which is the one moment a seller actually needs it.
 *
 * Bump CACHE_VERSION on any change to this file to evict old caches.
 */

const CACHE_VERSION = 'v19';
const CACHE_NAME = `zero-lines-${CACHE_VERSION}`;

// Relative so the app still works when deployed under a sub-path
// (vite.config.ts uses `base: './'`).
const PRECACHE = ['./', './index.html', './manifest.json'];

/**
 * Find the app shell — the boot JS and CSS — inside a copy of index.html.
 *
 * These two files are what stand between a seller and a blank screen, and they
 * are the two we cannot name here: Vite fingerprints them, so they are called
 * `assets/index-<hash>.js` and `assets/index-<hash>.css` and the hash changes
 * every build. index.html is the one filename that never moves, so read them
 * back out of it instead of hardcoding a list that would rot on the next deploy.
 *
 * Cross-origin hrefs (the Google Fonts stylesheet) are skipped on purpose —
 * they are not ours to cache, and the app falls back to system fonts without
 * them. Relative hrefs are resolved against the document, so this stays correct
 * under the GitHub Pages sub-path.
 */
function shellAssetsFrom(html, baseUrl) {
  const urls = new Set();
  const add = (raw) => {
    if (!raw || /^(?:[a-z]+:)?\/\//i.test(raw) || /^data:/i.test(raw)) return;
    try {
      urls.add(new URL(raw, baseUrl).href);
    } catch {
      /* malformed href — skip it rather than fail the whole install */
    }
  };

  // <script type="module" crossorigin src="./assets/index-<hash>.js">
  for (const m of html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)) add(m[1]);

  // <link rel="stylesheet" crossorigin href="./assets/index-<hash>.css">
  // Attribute order is not guaranteed, so match the tag then read its href.
  for (const m of html.matchAll(/<link\b[^>]*>/gi)) {
    const tag = m[0];
    if (!/\brel=["'](?:stylesheet|modulepreload)["']/i.test(tag)) continue;
    const href = tag.match(/\bhref=["']([^"']+)["']/i);
    if (href) add(href[1]);
  }

  return [...urls];
}

/** `assets/index-D6y0kPmT.js` → `index.js`: the file's identity minus the build hash. */
function assetFamily(rawUrl) {
  try {
    const m = new URL(rawUrl).pathname.match(/\/assets\/(.+)-[A-Za-z0-9_-]{8,}(\.[a-z0-9]+)$/i);
    return m ? m[1] + m[2] : null;
  } catch {
    return null;
  }
}

/**
 * Drop superseded copies of the shell.
 *
 * Most deploys do not touch sw.js, so this worker is never reinstalled and
 * CACHE_VERSION never moves. Without a prune, every single deploy would leave
 * another orphaned ~700KB boot bundle on the seller's phone, forever.
 *
 * Scoped to the shell's own filename families on purpose: the lazily cached
 * route chunks are not referenced by index.html, and wiping those would quietly
 * undo the offline coverage the seller has built up by using the app.
 */
async function pruneOldShell(cache, keepUrls) {
  const keep = new Set(keepUrls);
  const families = new Set(keepUrls.map(assetFamily).filter(Boolean));
  if (!families.size) return;
  const entries = await cache.keys();
  await Promise.allSettled(
    entries.map(async (req) => {
      if (keep.has(req.url)) return;
      const family = assetFamily(req.url);
      if (family && families.has(family)) await cache.delete(req);
    })
  );
}

/** Pull anything from that list we do not already hold. Already cached = no download. */
async function cacheShell(cache, html, baseUrl) {
  const urls = shellAssetsFrom(html, baseUrl);
  if (!urls.length) return;
  await Promise.allSettled(
    urls.map(async (url) => {
      if (await cache.match(url)) return;
      await cache.add(url);
    })
  );
  await pruneOldShell(cache, urls);
}

self.addEventListener('install', (event) => {
  // Deliberately NOT skipWaiting() here. A new worker that activates while the
  // old page is still open swaps the fingerprinted assets underneath it, so the
  // running app asks for a chunk that no longer exists and throws. Instead the
  // new worker waits, the app notices it, and the seller taps "refresh" when
  // they are ready — see src/components/PwaPrompts.tsx. The SKIP_WAITING message
  // below is what that tap sends.
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      // addAll() rejects the whole install if any single entry 404s.
      await Promise.allSettled(PRECACHE.map((u) => cache.add(u)));

      // Precache the shell too, or the first cold start with no signal is a
      // white screen: this worker only takes control *after* the page that
      // registered it has already fetched the boot JS and CSS, so those two
      // never pass through the fetch handler and never land in the cache.
      // The seller used to need a second full page load before the app could
      // survive going offline — and a hash-route tap is not a page load, so a
      // seller could use the app all day and still get nothing at the kiosk.
      //
      // Reads the copy just precached above rather than going back to the
      // network, and the shell files themselves are still fresh in the HTTP
      // cache from the page load a moment ago, so this costs ~nothing.
      try {
        const baseUrl = new URL('./index.html', self.location.href).href;
        const cachedIndex = await cache.match('./index.html');
        if (cachedIndex) await cacheShell(cache, await cachedIndex.text(), baseUrl);
      } catch {
        /* Never let this fail the install — runtime caching still fills in. */
      }
    })()
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
          const forCache = response.clone();
          const forParse = response.clone();
          const write = caches
            .open(CACHE_NAME)
            .then(async (c) => {
              await c.put(request, forCache);
              // A deploy renames the hashed shell files, and this worker may not
              // have been reinstalled (sw.js itself can be byte-identical between
              // builds). So re-read the shell out of the HTML we just fetched and
              // pull in anything new, while there is still a connection to do it
              // with. Without this, the first cold start after a deploy would be
              // a white screen again — cached index.html pointing at boot files
              // that were never cached.
              if (response.ok) await cacheShell(c, await forParse.text(), request.url);
            })
            .catch(() => {});
          // Keep the worker alive until that write finishes.
          try {
            event.waitUntil(write);
          } catch {
            /* event already settled — the write still runs, just unprotected */
          }
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
