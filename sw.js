const CACHE = 'thermtools-v2';
const ASSETS = [
  './',
  './index.html',
  './environment-fluxes.html',
  './heat-balance.html',
  './transient.html',
  './radiator.html',
  './heater.html',
  './mli.html',
  './conduction.html',
  './reference.html',
  './styles.css',
  './i18n.js',
  './share.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
