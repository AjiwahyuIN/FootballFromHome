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