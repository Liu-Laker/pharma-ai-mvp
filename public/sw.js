const CACHE_NAME = 'pharma-ai-mvp-v1'
const PRECACHE_URLS = [
  '/',
  '/index.html'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const resClone = response.clone()
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, resClone))
        return response
      })
      .catch(() => caches.match(event.request).then(r => r || caches.match('/index.html'))
  )
})
