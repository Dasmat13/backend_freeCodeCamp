const http = require('http');  // loads Node.js built-in 'http' module — needed to create a server

// http.createServer() creates the server
// The callback runs every time a client (browser) makes a request
const server = http.createServer((req, res) => {
    // req = request object  (what came IN — URL, headers, method, etc.)
    // res = response object (what we send OUT — text, HTML, status code, etc.)

    // ─── ROUTE: Home Page ────────────────────────────────────────────────
    if (req.url === '/') {
        // if the browser visits http://localhost:5000/ this block runs
        return res.end('HOME PAGE')  // sends "HOME PAGE" text as the response and ends it
                                      // 'return' stops the function here — don't fall through to other ifs
    }

    // ─── ROUTE: About Page (BUG HERE) ────────────────────────────────────
    if (req.url === '/about') {
        // BUG: the URL should be '/about' (with a leading slash), NOT './about'
        // Browsers always send URLs starting with '/' (e.g. /about, /contact)
        // './about' is a relative file path — it will NEVER match a browser request
        // FIX: Change './about' → '/about'

        // blocking code — simulates a heavy CPU task (like a slow database query)
        for (let i = 0; i < 1000; i++) {    // outer loop runs 1000 times
            for (let j = 0; j < 1000; j++) { // inner loop runs 1000 times per outer iteration
                console.log(`${i} ${j}`);    // logs i and j — 1,000,000 total console logs!
                                              // THIS BLOCKS THE EVENT LOOP — no other request can be served
            }
        }
        return res.end('ABOUT PAGE')  // sends 'ABOUT PAGE' after the blocking loop finishes
    }

    // ─── DEFAULT: Error Page ─────────────────────────────────────────────
    return res.end('ERROR PAGE')  // if neither '/' nor './about' matches, send this fallback
                                   // 'return' ends the response here
})

server.listen(5000, () => {
    // starts the server on port 5000
    // the optional callback runs only ONCE when the server is ready
    console.log('server listing on port: 5000 !!!');  // confirms server is up and listening
                                                        // NOTE: typo — 'listing' should be 'listening'
})