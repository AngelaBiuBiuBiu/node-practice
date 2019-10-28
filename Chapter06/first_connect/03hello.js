var connect = require('connect')

var app = connect()
// app.use(logger).use(hello).listen(3000)

// hello不调用next()，所以logger永远不会被调用
app.use(hello).use(logger).listen(3000)

function logger(req, res, next) {
    console.log('%s %s', req.method, req.url)
    next()
}

function hello(req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.end('Hello World')
}