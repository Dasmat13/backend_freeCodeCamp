const http = require('http');
// loads Node.js built-in 'http' module
// http.Server internally EXTENDS EventEmitter — so it IS an event emitter
// This is why you can use .on() directly on the server object

/* the common way to create a server (shorthand style):

const server = http.createServer((req, res) => {
    res.end('welcome')
    // The callback passed to createServer() is automatically registered
    // as a listener for the 'request' event under the hood
})
*/

// using event emitter API — the explicit (longer) way to do the same thing
// This makes it CLEAR that the HTTP server is an event emitter

const server = http.createServer()
// creates an HTTP server with NO listener attached yet
// the server exists but doesn't know how to respond to requests yet

server.on('request', (req, res) => {
    // .on() registers a listener for the built-in 'request' event
    // Node.js fires 'request' automatically every time a browser sends a request
    // 'req' = the incoming request object (URL, headers, method)
    // 'res' = the outgoing response object (used to send data back)
    return res.end('welcome by event emitter')
    // sends 'welcome by event emitter' as the response body
    // res.end() signals that the response is complete
    // 'return' ensures we exit the callback immediately after responding
})

server.listen(5000);
// starts the server and tells it to accept connections on port 5000
// visit http://localhost:5000 to trigger the 'request' event
// the server keeps running and emitting 'request' events on every new connection