/*
 * CCDI service worker — keeps media on the visitor's device so images,
 * videos, fonts and build files are downloaded once, not on every visit.
 *
 *  - Build files (/_next/static/…): cache-first. Their names change whenever
 *    their content does, so a cached copy is always correct.
 *  - Images and fonts: served from the device instantly. If the cached copy is
 *    older than 7 days it is quietly re-checked in the background.
 *  - Videos: the full file is stored on first play; later plays (and seeking)
 *    are answered from the device, including byte-range requests.
 *  - Pages: always fetched fresh from the network; the last copy is only used
 *    when the visitor is offline.
 *
 * To force every visitor to drop their caches (e.g. after replacing photos
 * under the same filenames), change VERSION and redeploy.
 */
const VERSION = "v1";
const CACHES = {
  build: `ccdi-build-${VERSION}`,
  media: `ccdi-media-${VERSION}`,
  video: `ccdi-video-${VERSION}`,
  pages: `ccdi-pages-${VERSION}`,
};
const LIMITS = { media: 500, video: 14, pages: 60, build: 200 };
const MEDIA_RECHECK_MS = 7 * 24 * 60 * 60 * 1000;
const STAMP = "x-ccdi-cached-at";

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keep = new Set(Object.values(CACHES));
      for (const name of await caches.keys())
        if (name.startsWith("ccdi-") && !keep.has(name))
          await caches.delete(name);
      if (self.registration.navigationPreload)
        await self.registration.navigationPreload.enable();
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  const path = url.pathname;

  if (path.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(event, req, CACHES.build, LIMITS.build));
  } else if (/\.(mp4|webm|mov)$/i.test(path)) {
    event.respondWith(video(event, req));
  } else if (/\.(webp|avif|jpe?g|png|gif|svg|ico|woff2?)$/i.test(path)) {
    event.respondWith(media(event, req));
  } else if (req.mode === "navigate" || /\.txt$/.test(path)) {
    event.respondWith(networkFirst(event, req));
  }
});

async function trim(cacheName, max) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  for (let i = 0; i < keys.length - max; i++) await cache.delete(keys[i]);
}

function stamped(res) {
  const headers = new Headers(res.headers);
  headers.set(STAMP, String(Date.now()));
  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers,
  });
}

async function store(cacheName, key, res, max) {
  if (!res || res.status !== 200 || res.type === "opaque") return;
  const cache = await caches.open(cacheName);
  await cache.put(key, stamped(res));
  await trim(cacheName, max);
}

async function cacheFirst(event, req, cacheName, max) {
  const cached = await caches.match(req, { cacheName });
  if (cached) return cached;
  const res = await fetch(req);
  event.waitUntil(store(cacheName, req, res.clone(), max));
  return res;
}

async function media(event, req) {
  const key = req.url.split("#")[0];
  const cached = await caches.match(key, { cacheName: CACHES.media });
  if (cached) {
    const age = Date.now() - Number(cached.headers.get(STAMP) || 0);
    if (age > MEDIA_RECHECK_MS)
      event.waitUntil(
        fetch(key, { cache: "no-cache" })
          .then((res) => store(CACHES.media, key, res, LIMITS.media))
          .catch(() => {}),
      );
    return cached;
  }
  const res = await fetch(req);
  event.waitUntil(store(CACHES.media, key, res.clone(), LIMITS.media));
  return res;
}

async function networkFirst(event, req) {
  const cache = await caches.open(CACHES.pages);
  try {
    const preload =
      req.mode === "navigate" ? await event.preloadResponse : null;
    const res = preload || (await fetch(req));
    if (res.ok)
      event.waitUntil(
        cache
          .put(req, res.clone())
          .then(() => trim(CACHES.pages, LIMITS.pages)),
      );
    return res;
  } catch (err) {
    const cached = await cache.match(req);
    if (cached) return cached;
    throw err;
  }
}

// ---------------------------------------------------------------- videos
const inFlight = new Map();

// Starts (or joins) one full download of a video. Resolves as soon as the
// response starts arriving, so playback is never held up by caching; the copy
// is written to the cache in parallel.
function downloadVideo(event, url) {
  if (!inFlight.has(url)) {
    const p = fetch(url).then((res) => {
      if (res.status === 200) {
        event.waitUntil(
          store(CACHES.video, url, res.clone(), LIMITS.video)
            .catch(() => {})
            .finally(() => inFlight.delete(url)),
        );
      } else inFlight.delete(url);
      return res;
    });
    p.catch(() => inFlight.delete(url));
    inFlight.set(url, p);
  }
  return inFlight.get(url);
}

async function video(event, req) {
  const url = req.url.split("#")[0];
  const range = req.headers.get("range");
  const cached = await caches.match(url, { cacheName: CACHES.video });
  if (cached) return fromCache(cached, range);

  // First play from the start: fetch the whole file once, keep a copy, and
  // hand the same download to the player (no double download).
  if (!range || /^bytes=0-$/.test(range.trim())) {
    try {
      const res = await downloadVideo(event, url);
      return res.clone();
    } catch {
      return fetch(req);
    }
  }
  // Any other range (e.g. Safari's first probe): answer from the network now
  // and store the full file in the background for next time.
  event.waitUntil(downloadVideo(event, url).catch(() => {}));
  return fetch(req);
}

async function fromCache(cached, range) {
  if (!range) return cached;
  const blob = await cached.blob();
  const size = blob.size;
  const m = /bytes=(\d*)-(\d*)/.exec(range);
  if (!m) return cached;
  let start, end;
  if (m[1] === "") {
    start = Math.max(0, size - Number(m[2]));
    end = size - 1;
  } else {
    start = Number(m[1]);
    end = m[2] === "" ? size - 1 : Math.min(Number(m[2]), size - 1);
  }
  if (start >= size || start > end)
    return new Response(null, {
      status: 416,
      headers: { "Content-Range": `bytes */${size}` },
    });
  return new Response(blob.slice(start, end + 1), {
    status: 206,
    headers: {
      "Content-Type": cached.headers.get("Content-Type") || "video/mp4",
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Content-Length": String(end - start + 1),
      "Accept-Ranges": "bytes",
    },
  });
}
