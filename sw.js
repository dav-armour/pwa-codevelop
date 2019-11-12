// Install event
self.addEventListener('install', event => {
  console.log("Service worker installed");
})

// Activate event
self.addEventListener('activate', event => {
  console.log("Service worker activated");
})

// Fetch event
self.addEventListener('fetch', event => {
  console.log("Fetch event", event);
})