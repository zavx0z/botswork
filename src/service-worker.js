/* eslint-disable no-restricted-globals */
import {clientsClaim} from 'workbox-core'
import {ExpirationPlugin} from 'workbox-expiration'
import {createHandlerBoundToURL, precacheAndRoute} from 'workbox-precaching'
import {registerRoute} from 'workbox-routing'
import {StaleWhileRevalidate} from 'workbox-strategies'

clientsClaim()

const CACHE_VERSION = process.env.REACT_APP_VERSION
const CACHE_NAME = `BotsWorkCache-${CACHE_VERSION}`
// console.log(self.__WB_MANIFEST)
const manifest = [...self.__WB_MANIFEST]
console.log(manifest)
precacheAndRoute(manifest, {})

registerRoute(({url}) => url.origin === self.location.origin && url.pathname.endsWith('.png'),
    new StaleWhileRevalidate({
        cacheName: 'images',
        plugins: [
            new ExpirationPlugin({maxEntries: 50}),
        ],
    })
)
registerRoute(({request}) => request.destination === 'script', new StaleWhileRevalidate())
// registerRoute(
//     /\.(?:js|css|html)$/,
//     new CacheFirst({
//         cacheName: 'static-cache',
//     })
// )
//
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$')
registerRoute(({request, url}) => {
        if (request.mode !== 'navigate') {
            if (request.url.startsWith(process.env.REACT_APP_HOST + '/socket.io'))
                console.log('[WB]: request socket.io')
            else if (request.url.startsWith(process.env.REACT_APP_HOST + '/api.v1'))
                console.log('[WB]: request api.v1')
            else if (request.url.startsWith('https://api.i18nexus.com'))
                console.log('[WB]: request i18next')
            else if (request.url.startsWith(process.env.PUBLIC_URL))
                console.log('[WB]: request botswork.ru')
            else
                console.log('Workbox: Данный запрос не является навигацией. Пропущен.', request)
            return false
        }
        if (url.pathname.startsWith('/_')) {
            console.log('Workbox: Данный запрос начинается с /_. Пропущен.', url.pathname)
            return false
        }

        if (url.pathname.match(fileExtensionRegexp)) {
            console.log('Workbox: Данный запрос содержит расширение файла. Пропущен.', url.pathname)
            return false
        }

        console.log('Workbox: Данный запрос будет обработан:', url.pathname)
        return true
    },
    createHandlerBoundToURL(`${process.env.PUBLIC_URL}/index.html`),
)

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        console.log('Workbox: Получено сообщение о пропуске ожидания.')
        self.skipWaiting()
    }
})

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName.startsWith('BotsWorkCache-') && cacheName !== CACHE_NAME) {
                        console.log('Workbox: Удаление кэша', cacheName)
                        return caches.delete(cacheName)
                    }
                    return null
                }),
            )
        }),
    )
})