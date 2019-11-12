const staticCacheName = 'site-static-v2';
const dynamicCacheName = 'site-dynamic-v1';
const assetUrls = [
  '/',
  '/index.html',
  '/js/app.js',
  '/js/ui.js',
  '/js/materialize.min.js',
  '/css/styles.css',
  '/css/materialize.min.css',
  '/img/book.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
  '/pages/fallback.html'
];

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys()
      .then(keys => {
        if (keys.length > size) {
          cache.delete(keys[0]).then(limitCacheSize(name, size));
        }
      })
  })
}

// Install event
self.addEventListener('install', event => {
  // console.log("Service worker installed");
  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => {
        console.log('caching assets');
        cache.addAll(assetUrls);
    })
  )

})

// Activate event
self.addEventListener('activate', event => {
  // console.log("Service worker activated");
  event.waitUntil(
    caches.keys()
      .then(keys => {
        // console.log(keys);
        return Promise.all(keys
          .filter(key => key !== staticCacheName && key !== dynamicCacheName)
          .map(key => caches.delete(key))
        )
      })
  )
})

// Fetch event
self.addEventListener('fetch', event => {
  // console.log("Fetch event", event);
  if (event.request.url.includes('firestore.googleapis.com')) return;
  event.respondWith(
    caches.match(event.request)
      .then(cacheRes => {
        return cacheRes || fetch(event.request).then(fetchRes => {
          return caches.open(dynamicCacheName).then(cache => {
            cache.put(event.request, fetchRes.clone());
            limitCacheSize(dynamicCacheName, 15);
            return fetchRes;
          })
        });
      })
      .catch(() => {
        if (event.request.url.includes('.html')) {
          return caches.match('/pages/fallback.html')
        }
      })
  )
})