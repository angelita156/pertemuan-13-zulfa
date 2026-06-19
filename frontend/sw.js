const CACHE_NAME = "profile-cache-v2";

const urlsToCache = [
  "./",
  "./index.html",
  "./profile.html",
  "./artikel.html",
  "./script.js",
  "./file.js",
  "./style.css",
  "./ceeses.css",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./nara.jpg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    }),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});
self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  event.waitUntil(clients.openWindow("profile.html"));
});
