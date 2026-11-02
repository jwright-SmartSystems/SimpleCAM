// SimpleCAM offline support. Network first, so a new version is picked up whenever the PC is online;
// the cached copy is used when it is offline.
const CACHE = 'simplecam';
const FILES = ['./', './SimpleCAM.html', './manifest.webmanifest', './logo.svg', './SimpleCAM-Manual.pdf',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fetch(e.request)
      .then(r => { if (r.ok){ const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); } return r; })
      .catch(() => caches.match(e.request, {ignoreSearch: true}).then(r => r || caches.match('./SimpleCAM.html')))
  );
});
