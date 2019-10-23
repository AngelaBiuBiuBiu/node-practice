var http = require('http')

// 写法一
// http.createServer(function (req, res) {
//     res.writeHead(200, {
//         'Content-Type': 'text/plain'
//     })
//     res.end('Hello World\n')
// }).listen(3000)
// console.log('Server running at http://localhost:3000/')

// 写法二，request事件看起来更明显一点
var server = http.createServer()
server.on('request', function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    })
    res.end('Hello World\n')
})
server.listen(3000)
console.log('Server running at http://localhost:3000/')
