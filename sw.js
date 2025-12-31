const CACHE_NAME = 'bora-cv-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './data.js',
  './profil_lowres.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
