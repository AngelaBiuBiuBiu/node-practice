// basic认证，借助带着base64编码认证信息的HTTP请求头中的authorization字段进行认证
function restrict(req, res, next) {
    var authorization = req.headers.authorization
    if(!authorization) {
        return next(new Error('Unauthorization'))
    }
    var parts = authorization.split(' ')
    var scheme = parts[0]
    var auth = new Buffer(parts[1], 'base64').toString().split(':')
    var user = auth[0]
    var pass = auth[1]

    authenticateWithDatabase(user, pass, function(err) {
        if(err) return next(err)
        next()
    })
}

function admin(req, res, next) {
    switch (req.url) {
        case '/':
            res.end('try /users')
            break;
        case '/users':
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(['tobi', 'loki', 'jane']))
            break
    }
}

function logger(req, res, next) {
    console.log('%s %s', req.method, req.url)
    next()
}

function hello(req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.end('Hello World')
}

var connect = require('connect')
var app = connect()
app.use(logger).use('/admin', restrict).use('/admin', admin).use(hello).listen(3000)