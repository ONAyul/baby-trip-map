const CACHE = "baby-trip-v9";
const IS_LOCAL = ["localhost", "127.0.0.1"].includes(self.location.hostname);
const ASSETS = [
  "/",
  "index.html",
  "manifest.webmanifest?v=9",
  "styles/base.css?v=9",
  "styles/layout.css?v=9",
  "styles/map.css?v=9",
  "styles/components.css?v=9",
  "data/meta.js?v=7",
  "data/placeFactory.js?v=7",
  "data/places.js?v=9",
  "data/places-auto.js?v=9",
  "data/places-daejeon-cheonan.js?v=8",
  "data/places-capital.js?v=7",
  "data/places-regions.js?v=7",
  "src/app.js?v=9",
  "src/filter.js?v=7",
  "src/geo.js?v=7",
  "src/map.js?v=7",
  "src/mapControls.js?v=7",
  "src/render.js?v=9",
  "src/state.js?v=7",
  "assets/icons/app-icon.svg"
];

self.addEventListener("install", (event) => {
  if (IS_LOCAL) {
    self.skipWaiting();
    return;
  }
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      const old = IS_LOCAL ? keys : keys.filter((key) => key !== CACHE);
      return Promise.all(old.map((key) => caches.delete(key)));
    })
  );
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  if (IS_LOCAL) {
    event.respondWith(fetch(event.request));
    return;
  }
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
