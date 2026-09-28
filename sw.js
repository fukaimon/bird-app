const CACHE_NAME = "toriawase-v70";
const OFFLINE_URL = new URL("./index.html", self.registration.scope).href;
const APP_ASSETS = [
  "./",
  "./index.html",
  "./settings.html",
  "./bird-sort.html",
  "./data-input.html",
  "./icons/icon-192.png?v=35",
  "./style.css?v=69",
  "./app.js?v=67",
  "./bird-data.js?v=66",
  "./bird-sort.js?v=66",
  "./data-input.js?v=67",
  "./manifest.webmanifest",
  "./icons/icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
].map(path => new URL(path, self.registration.scope).href);

self.addEventListener("install", event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      await Promise.all(APP_ASSETS.map(async assetUrl => {
        try {
          const response = await fetch(assetUrl, { cache: "reload" });
          if (response.ok) {
            await cache.put(assetUrl, response);
          }
        } catch (error) {
          console.warn("Failed to cache:", assetUrl, error);
        }
      }));

      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => cache.put(event.request, responseToCache));
          return response;
        })
        .catch(() => caches.match(event.request).then(cachedResponse => cachedResponse || caches.match(OFFLINE_URL)))
    );
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== "basic") {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME)
          .then(cache => cache.put(event.request, responseToCache));

        return networkResponse;
      })
      .catch(() => caches.match(event.request).then(cachedResponse => cachedResponse || caches.match(OFFLINE_URL)))
  );
});
