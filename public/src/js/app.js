if ('serviceWorker' in navigator) {
    // 假如今天我們網頁有很多圖片、CSS和JS資源要載入，是必我們就必須分配CPU和記憶體來執行，雖然現在手機規格越來越好，但我們還是必須假設頻寬是有一定限制，既然Service Worker對使用者感受上不會有任何反應，我們等頁面資源全部載入後再註冊也不遲。
    window.addEventListener('load', function () {
        navigator.serviceWorker
            .register('/service-worker.js')
            .then(function () {
                console.log('Service Worker 註冊成功')
            })
            .catch(function (error) {
                console.log('Service worker 註冊失敗:', error)
            })
    })
} else {
    console.log('瀏覽器不支援')
}

// // get
// fetch('http://httpbin.org/ip')
//     .then(function (response) {
//         console.log('response', response)
//         return response.json()
//     })
//     .then(function (data) {
//         console.log('data', data)
//     })
//     .catch(function (err) {
//         console.log('err', err)
//     })

// // post
// fetch('http://httpbin.org/post', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//     },
//     mode: 'cors',
//     body: JSON.stringify({ message: 'POST資料是否成功' }),
// })
//     .then(function (response) {
//         console.log(response)
//         return response.json()
//     })
//     .then(function (data) {
//         console.log(data)
//     })
//     .catch(function (err) {
//         console.log(err)
//     })
