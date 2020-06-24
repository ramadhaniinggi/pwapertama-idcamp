const cache_name = "pwacache";
// asset utk ditaruh di cache storage
let urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/contact.html",
  "/pages/delivery.html",
  "/pages/shop.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/img/bg_4.jpg",
  "/img/brand_4.png",
  "/img/cosmetic_4.jpg",
  "/img/electronic_4.jpg",
  "/img/grocery_4.jpg",
  "/img/menclothes_4.jpg",
  "/img/womenclothes_4.jpg",
  "/css/style.css",
  "/css/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
  "/manifest.json",
  "/img/icon-128x128.png",
  "/img/icon-144x144.png",
  "/img/icon-152x152.png",
  "/img/icon-192x192.png",
  "/img/icon-384x384.png",
  "/img/icon-512x512.png",
  "/img/icon-72x72.png",
  "/img/icon-96x96.png",
];

// utk menyimpan/menambahkan cache di cache storage
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(cache_name).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// utk menggunakan cache yg di cache storage
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: cache_name })
      .then(function (response) {
        if (response) {
          console.log("serviceworker:gunakan aset dari cache:", response.url);
          return response;
        }

        console.log(
          "serviceworker:memuat aset dari server:",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});

// utk menghapus cache lama agar tdk membebani pengguna
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != cache_name) {
            console.log(`serviceworker : cache ${cacheName} dihapus`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
