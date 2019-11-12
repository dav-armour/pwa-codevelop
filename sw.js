const staticCacheName = 'site-static-v1';
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
  'https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
];

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
})

// Fetch event
self.addEventListener('fetch', event => {
  // console.log("Fetch event", event);
  event.respondWith(
    caches.match(event.request)
      .then(cahceRes => {
        return cahceRes || fetch(event.request);
      })
  )
})