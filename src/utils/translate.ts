// ─────────────────────────────────────────────────────────────────────────────
// translate.ts — Direct Google Translate API calls
// Uses Google's free translation endpoint (same one the widget uses internally)
// Caches results in sessionStorage to avoid repeated API calls
// ─────────────────────────────────────────────────────────────────────────────

const CACHE_KEY = 'gt_cache_v1';
const MAX_CACHE_SIZE = 500;

interface CacheEntry {
  text: string;
  ts: number;
}

function loadCache(): Record<string, CacheEntry> {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return {};
}

function saveCache(cache: Record<string, CacheEntry>) {
  try {
    // Trim if too large
    const keys = Object.keys(cache);
    if (keys.length > MAX_CACHE_SIZE) {
      const sorted = keys.sort((a, b) => cache[a].ts - cache[b].ts);
      for (let i = 0; i < sorted.length - MAX_CACHE_SIZE; i++) {
        delete cache[sorted[i]];
      }
    }
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch { /* ignore */ }
}

function cacheKey(text: string, targetLang: string): string {
  return `${targetLang}::${text.slice(0, 200)}`;
}

/** Translate a single text string */
export async function translateText(text: string, targetLang: 'es' | 'en' = 'es'): Promise<string> {
  if (!text || targetLang === 'en') return text;
  if (text.length > 5000) return text; // too long

  const cache = loadCache();
  const key = cacheKey(text, targetLang);
  if (cache[key]) {
    cache[key].ts = Date.now();
    saveCache(cache);
    return cache[key].text;
  }

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    if (!response.ok) return text;
    const data = await response.json();

    // Google returns: [[["translated","original",...]],...]
    if (Array.isArray(data) && data[0] && Array.isArray(data[0])) {
      const translated = data[0].map((item: any) => item[0]).join('');
      if (translated && translated !== text) {
        cache[key] = { text: translated, ts: Date.now() };
        saveCache(cache);
        return translated;
      }
    }
  } catch {
    // Network error / CORS blocked — return original
  }

  return text;
}

/** Translate multiple texts in parallel (with batching) */
export async function translateTexts(texts: string[], targetLang: 'es' | 'en' = 'es'): Promise<string[]> {
  if (targetLang === 'en') return texts;
  const results = await Promise.all(texts.map(t => translateText(t, targetLang)));
  return results;
}

/** Walk DOM and translate all text nodes */
export async function translatePage(targetLang: 'es' | 'en'): Promise<void> {
  if (targetLang === 'en') {
    // Restore original — reload page
    window.location.reload();
    return;
  }

  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null
  );

  const nodes: Text[] = [];
  const texts: string[] = [];
  let node: Text | null;

  while ((node = walker.nextNode() as Text | null)) {
    const parent = node.parentElement;
    // Skip script/style/textarea elements and already-processed nodes
    if (!parent) continue;
    if (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE' || parent.tagName === 'TEXTAREA') continue;
    if (parent.closest('#google_translate_element')) continue;

    const text = node.textContent || '';
    if (text.trim().length > 2 && /^[a-zA-Z]/.test(text.trim())) {
      nodes.push(node);
      texts.push(text);
    }
  }

  // Translate in batches of 20 to avoid rate limiting
  const BATCH_SIZE = 20;
  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batchTexts = texts.slice(i, i + BATCH_SIZE);
    const batchNodes = nodes.slice(i, i + BATCH_SIZE);
    try {
      const translated = await translateTexts(batchTexts, targetLang);
      batchNodes.forEach((n, idx) => {
        if (translated[idx] !== batchTexts[idx]) {
          n.textContent = translated[idx];
        }
      });
    } catch {
      // Skip batch on error
    }
  }
}
