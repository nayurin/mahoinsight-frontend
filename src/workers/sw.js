/* eslint-env serviceworker */
import { registerRoute } from 'workbox-routing'
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'

self.addEventListener('activate', () => self.clients.claim())
self.addEventListener('message', event => {
  if (event.data && event.data.content === 'skipwaiting') {
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
  ({ url }) => url.pathname.startsWith('/preload/') || url.pathname.startsWith('/lib/'),
  new CacheFirst({
    cacheName: "preload-resources",
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 30
      })
    ]
  })
)

registerRoute(
  ({ url }) => url.hostname.startsWith('mahomaho-insight-cos'),
  new CacheFirst({
    cacheName: "cos-resources",
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 30
      })
    ]
  })
)

registerRoute(
  ({ url }) => url.pathname.startsWith('/cached/'),
  new StaleWhileRevalidate({
    cacheName: "data-resources",
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24
      })
    ]
  })
)

precacheAndRoute(self.__WB_MANIFEST)
