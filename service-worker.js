self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('inventory-app').then((cache) => cache.addAll([
            '/',
            '/index.html',
            '/css/style.css',
            '/js/script.js',
            'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css',
            'https://code.jquery.com/jquery-3.5.1.slim.min.js',
            'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js'
        ]))
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request))
    );
});
