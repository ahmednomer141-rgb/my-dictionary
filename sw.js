const CACHE_NAME = 'qamoosi-cache-v2.0';
const urlsToCache = [
  './',
  './index.html',
  './tesseract.min.js',
  './manifest.json',
  './logo192.png',
  './logo512.png',
  './tessdata/eng.traineddata',
  './tesseract/tesseract-core.wasm',
  './tesseract/worker.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
