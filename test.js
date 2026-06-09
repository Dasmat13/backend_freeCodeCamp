const http = require('http')

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        return res.end('Home Page')
    }

    res.end('404 Not Found')
})

server.listen(9000)