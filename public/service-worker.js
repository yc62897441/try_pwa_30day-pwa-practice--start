// self是一個語法糖，讓我們可以存取Service Worker的背景程式，有寫過網頁的應該都覺得addEventListener這個關鍵字很熟悉，但是在Service Worker裡面，是無法使用click之類我們平常所使用的事件，因為再前一天說過，Service Worker是一套運行再背景的程式，是沒有權限能存取DOM的，所以理所當然能操作DOM的事件在這邊都是無法使用的。

// 在install的事件發生的時候，我們可以快取頁面上最少的必要性資源，快取的容量是有限的，因此，不應該什麼資源都快取起來，所以我們選擇將網頁中，每一頁都有的必要資源快取起來，並以網頁不跑版為前提做選擇。
// cache.add()、cache.addAll() 裡面放的路徑，是專案內的資源路徑，則 OK；是外部資源則放在 html <head><link> 裡面，或是 <script > 裡面，也 OK。但如果是外部資源且放在 <body> 裡面，則整個 cache.addAll() 都會無法順利執行。
self.addEventListener('install', function (event) {
    console.log('[SW] 安裝(Install) Service Worker!', event)
    event.waitUntil(
        caches.open('static').then(function (cache) {
            cache.addAll([
                '/',
                '/favicon.ico',
                '/index.html',
                '/src/css/app.css',
                '/src/images/demo.JPG',
                '/src/images/icons/demo-icon144.png',
                '/src/js/app.js',
                '/src/js/post.js',
                'https://code.getmdl.io/1.3.0/material.blue-red.min.css',
                'https://code.getmdl.io/1.3.0/material.min.js',
                'https://fonts.googleapis.com/css?family=Roboto:400,700',
                'https://fonts.googleapis.com/icon?family=Material+Icons',
            ])
        })
    )
})

self.addEventListener('activate', function (event) {
    console.log('[SW] 觸發(Activate) Service Worker!', event)
    return self.clients.claim()
})

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            // 抓不到會拿到 null
            if (response) {
                console.log('從 cache 拿到的:', response)
                return response
            } else {
                console.log('去 fetch:', event.request)
                return fetch(event.request)
            }
        })
    )
})

// self.addEventListener('fetch', function (event) {
//     event.respondWith(
//         caches.match(event.request).then(function (response) {
//             //抓不到會拿到 null
//             if (response) {
//                 return response
//             } else {
//                 return fetch(event.request).then(function (res) {
//                     // 當抓到沒有快取的資源時，就透過cache.put()方法放進資源中。
//                     caches.open('dynamic').then(function (cache) {
//                         cache.put(event.request.url, res.clone())
//                         return res
//                     })
//                 })
//             }
//         })
//     )
// })
