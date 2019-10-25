// 异步逻辑的顺序化


// 1. 回调让任务顺序执行
setTimeout(function () {
    console.log('I execute first.')
    setTimeout(function() {
        console.log('I execute next.')
        setTimeout(function () {
            console.log('I execute last.')
        }, 100)
    }, 500);
}, 1000)

// 使用社区贡献的流程控制工具Nimble实现串行化控制
var flow = require('nimble')
flow.series([
    function (callback) {
        setTimeout(function () {
            console.log('I execute first.')
            callback()
        }, 1000)
    },
    function (callback) {
        setTimeout(function () {
            console.log('I execute next.')
            callback()
        }, 500)
    },
    function (callback) {
        setTimeout(function () {
            console.log('I execute last.')
            callback()
        }, 100)
    }
])