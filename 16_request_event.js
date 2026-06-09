const http = require('http');

/* the common way to create a server

const server = http.createServer((req , res) => {
    res.end('welcome')
})
*/

//using event emitter API

const server = http.createServer()
server.on('request',(req, res)=> {
    return res.end('welcome by event emitter')  
})

server.listen(5000);