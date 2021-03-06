var CACHE_NAME = "my-site-cache-v1";
var urlsToCache = [
  "/",
  "services.html",
  "/team.html",
  "contact-us.html",
  "images/home/10.webp",
  "/images/home/11.webp",
];

self.addEventListener("install", function (event) {
  console.log("installing...");
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log(cache);
      cache.addAll(urlsToCache);
    })
  );
});
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request).then(function (response) {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }
        var responseToCache = response.clone();

        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});

self.addEventListener("activate", function (event) {
  console.log("activating...");
});
