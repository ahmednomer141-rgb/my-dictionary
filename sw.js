const CACHE_NAME = 'qamoosi-cache-v1';
const urlsToCache = [
  '/',
  '/qamoosi.html',
  '/tesseract.min.js',  // إذا نزلتها محليًا
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
  // أضف هنا أي ملفات أخرى مثل data.json إذا فصلت البيانات
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
