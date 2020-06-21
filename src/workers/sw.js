/* eslint-env serviceworker */
import { registerRoute } from 'workbox-routing'
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { CacheFirst } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'

self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', () => self.clients.claim())
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

cleanupOutdatedCaches()

registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 180,
        maxEntries: 30,
      })
    ]
  })
)

registerRoute(
  /^https:\/\/mahomaho-insight-cos-.*.png$/,
  new CacheFirst({
    cacheName: "images-resources",
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 30
      })
    ]
  })
)

precacheAndRoute(self.__WB_MANIFEST)
