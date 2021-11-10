const CACHE_ALL = "James_cache_portafolio_v1";
urlsToCache = [
    './',
    './css/bootstrap.min.css',
    './css/font-awesome.min.css',
    './css/animate.css',
    './css/style.css',
    './js/jquery-1.11.2.min.js',
    './js/bootstrap.min.js',
    './js/plugins.js',
    './js/main.js',
    './images/favicon.png',
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_ALL)
            .then(cache => {
                return cache.addAll(urlsToCache)
                    .then(() => self.skipWaiting())
            })
            .catch(err => console.log("Fallo en la instalación del SW: ", err))
    );
});

self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_ALL]

    e.waitUntil(
        caches.keys()
            .then(cachesNames => {
                cachesNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            })
            .then(() => self.clients.claim())
    );

});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if (res) {
                    return res
                }

                return fetch(e.request)
            })
    )
});
