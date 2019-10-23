var http = require('http')
var fs = require('fs')

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'image/png'})

    // 数据从文件中读取进来，然后数据随着进来就被送到（.pipe）客户端（res）
    fs.createReadStream('./image.png').pipe(res)
}).listen(3000)

console.log('Server running at http://localhost:3000/')