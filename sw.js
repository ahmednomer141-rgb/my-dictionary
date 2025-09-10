const CACHE_NAME = 'qamoosi-cache-v1.1';
const urlsToCache = [
  '/',
  '/qamoosi.html',  // غير هذا إلى اسم ملف HTML الرئيسي إذا لزم (مثل index.html)
  '/tesseract.min.js',  // إذا نزلتها محليًا
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  // أضف هنا أي ملفات أخرى مثل data.json إذا فصلت البيانات
  
  // المسارات الجديدة لـ Tesseract (للعمل offline)
  '/tessdata/eng.traineddata',  // نموذج الإنجليزية المدرب (من tessdata_best)
  '/tessdata/ara.traineddata',  // نموذج العربية المدرب (من tessdata_best)
  '/tesseract/tesseract-core.wasm'  // الملف الأساسي لـ Tesseract
  // إذا كان لديك worker.min.js، أضفه هنا: '/tesseract/worker.min.js'
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
