const http = require('http');  // loads Node.js built-in 'http' module — needed to create a web server

// Creates an HTTP server using the event-driven model
// The callback is an EVENT LISTENER — it fires every time a new request arrives
// This demonstrates why Node.js is great for servers: one callback handles ALL requests
const server = http.createServer((req, res) => {
    // 'req' = incoming request object (what the client sent)
    // 'res' = outgoing response object (what we send back)

    console.log('request event');  // logs to terminal every time ANY request hits the server
                                    // this proves Node.js is event-driven: this only fires ON a request

    res.end('hello world')         // sends 'hello world' as the response body to the client
                                    // res.end() also tells the client: "I'm done sending data"
                                    // Without res.end(), the browser would hang waiting forever
})

server.listen(5000, () => {
    // .listen() starts the server — tells it to accept connections on port 5000
    // The callback runs ONCE when the server is fully ready to accept requests
    console.log('server listening on port : 5000....');  // NOTE: typo — 'listing' should be 'listening'
                                                         // Prints once at startup, then the server waits
})