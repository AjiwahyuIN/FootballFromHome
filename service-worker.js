const CACHE_NAME = 'FootballFromHome-v1';
var urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/pages/standing.html",
    "/pages/clubs.html",
    "/pages/match.html",
    "/pages/saved.html",
    "/css/materialize.min.css",
    "/css/main.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/img/appetizers.webp",
    "/img/appetizers2.webp",
    "/img/appetizers3.webp",
    "/img/mainDish.webp",
    "/img/dish2.webp",
    "/img/dish3.webp",
    "/img/dessert.webp",
    "/img/dessert2.webp",
    "/img/dessert3.webp",
    "/img/kitchen.webp",
    "/img/icon-72.png",
    "/img/icon-96.png",
    "/img/icon-128.png",
    "/img/icon-144.png",
    "/img/icon-192.png",
    "/img/icon-512.png",
    "/manifest.json",
    "/register.js",
    "/js/api.js",
    "/js/clubs.js",
    "/js/match.js",
    "/js/idb.js",
    "/js/db.js",
    "/push.js"
];

// self.addEventListener("install", event => {
//     event.waitUntil(
//         caches.open(CACHE_NAME).then(function (cache) {
//             return cache.addAll(urlsToCache);
//         })
//     );
// });

// self.addEventListener("fetch", event => {
//     event.respondWith(
//         caches
//         .match(event.request, {
//             cacheName: CACHE_NAME
//         })
//         .then(function (response) {
//             if (response) {
//                 console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
//                 return response;
//             }

//             console.log(
//                 "ServiceWorker: Memuat aset dari server: ",
//                 event.request.url
//             );
//             return fetch(event.request);
//         })
//     );
// });

// self.addEventListener("activate", event => {
//     event.waitUntil(
//         caches.keys().then(function (cacheNames) {
//             return Promise.all(
//                 cacheNames.map(function (cacheName) {
//                     if (cacheName != CACHE_NAME) {
//                         console.log("ServiceWorker: cache " + cacheName + " dihapus");
//                         return caches.delete(cacheName);
//                     }
//                 })
//             );
//         })
//     );
// });

self.addEventListener("install", function (event) {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", function (event) {
    const base_url = "https://api.football-data.org/v2/";
    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function (cache) {
                return fetch(event.request).then(function (response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, {
                'ignoreSearch': true
            }).then(function (response) {
                return response || fetch(event.request);
            })
        )
    }
});

// registrasi push notification
// self.addEventListener('push', function (event) {
//     var body;
//     if (event.data) {
//         body = event.data.text();
//     } else {
//         body = 'Push message no payload';
//     }
//     var options = {
//         body: body,
//         icon: 'img/notification.png',
//         vibrate: [100, 50, 100],
//         data: {
//             dateOfArrival: Date.now(),
//             primaryKey: 1
//         }
//     };
//     event.waitUntil(
//         self.registration.showNotification('Push Notification', options)
//     );
// });