// 把数据流看作特殊的数组，数据流的数据是分散在时间上的，通过将数据一块一块的传送，每收到一块数据就开始处理，而不用等到所有数据到全了再开始处理
const fs = require('fs')

var stream = fs.createReadStream('./resource.json')
// 当有新的数据块准备好就会激发data事件
stream.on('data', function (chunk) {
    console.log(chunk)
})
stream.on('end', function () {
    console.log('finished.')
})