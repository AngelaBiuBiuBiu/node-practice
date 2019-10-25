var fs = require('fs')
var request = require('request')
// htmlparser把原始的RSS数据转换成JavaScript数据结构
var htmlparser = require('htmlparser')
var configFilename = './rss_feeds.txt'


// 确保包含RSS预定源URL列表文件存在
function checkForRSSFile() {
    fs.exists(configFilename, function (exists) {
        if (!exists) {
            // 尽早返回
            return next(new Error('Missing RSS File: ' + configFilename))
        }
        next(null, configFilename)
    })
}

// 读取并解析包含RSS预定源URL的文件
function readRSSFile(configFilename) {
    fs.readFile(configFilename, function (err, feedList) {
        if (err) {
            return next(err)
        }
        feedList = feedList.toString().replace(/^\s+|\s+$/g, '').split('\n')
        var random = Math.floor(Math.random() * feedList.length)
        next(null, feedList[random])
    })
}


// 向选定的预定源发生HTTP请求以发送数据
function downloadRSSFeed(feedUrl) {
    request({ uri: feedUrl }, function (err, res, body) {
        if (err) {
            return next(err)
        }
        if (res.statusCode != 200) {
            return next(new Error('Abnormal response status code'))
        }
        next(null, body)
    })
}


// 将预定源数据解析到一个条目数组中
function parseRSSFeed(rss) {
    var handler = new htmlparser.RssHandler()
    var parser = new htmlparser.Parser(handler)
    parser.parseComplete(rss)
    if(!handler.dom.items.length) {
        return next(new Error('No RSS items found'))
    }
    var item = handler.dom.items.shift()
    console.log(item.title)
    console.log(item.link)
}

var tasks = [checkForRSSFile, readRSSFile, downloadRSSFeed, parseRSSFeed]

function next(err, result) {
    if (err) throw err
    var currentTask = tasks.shift()
    if (currentTask) {
        currentTask(result)
    }
}

next()