function Watcher (watchDir, processDir) {
    this.watchDir = watchDir
    this.processDir = processDir
}

var events = require('events')
var util = require('util')
util.inherits(Watcher, events.EventEmitter)
// Watcher.prototype = new events.EventEmitter()

var fs = require('fs')
var watchDir = './watch'
var processedDir = './done'

Watcher.prototype.watch = function () {
    var watcher = this
    fs.readdir(watchDir, function (err, files) {
        if (err) throw err
        for (var index in files) {
            watcher.emit('process', files[index])
        }
    })
}

Watcher.prototype.start = function () {
    var watcher = this
    fs.watchFile(watchDir, function () {
        watcher.watch()
    })
}

var watcher = new Watcher(watchDir, processedDir)
watcher.on('process', function process (file) {
    var watchFile = this.watchDir + '/' + file
    var processedFile = this.processDir + '/' + file.toLowerCase()
    fs.rename(watchFile, processedFile, function(err) {
        if(err) throw err
    })
})

watcher.start()