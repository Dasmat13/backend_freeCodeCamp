// ============================================================
// 13_http_modules.js — Building an HTTP Server
// ============================================================

// BUG NOTICE: This file has two declarations of 'http' and 'server' (lines 1-21 and lines 26-58).
// Node.js will throw: "SyntaxError: Identifier 'http' has already been declared"
// The FIRST block (lines 1-21) appears to be an earlier, incomplete draft.
// The SECOND block (lines 26-58) is the clean, commented final version.
// FIX: Remove the first block and keep only the second block.

// ─── ORIGINAL DRAFT (this block should be removed) ────────────────────────
// const http = require('http');
// const server = http.createServer((req,res)=> {
//     if(req.url === '/'){
//         return res.end('this is the home page')
//     }
//     if(req.url === '/about'){
//         return res.end('this is the about page')
//     }
//     res.end(`
//          <h1>Oops !!</h1>
//          <p>this is not working</p>
//          <a href="/"> back home</a>
//         `);
// })
// server.listen(5000)
// ─── END OF DRAFT ─────────────────────────────────────────────────────────

// Import the built-in HTTP module to create a web server
const http = require('http');   // loads Node.js core 'http' module — no npm install needed

// Create an HTTP server
// http.createServer() takes a callback that runs on EVERY incoming request
// req  = request object  → contains info about what the client sent (URL, headers, method)
// res  = response object → what we use to send data back to the client
const server = http.createServer((req, res) => {

    // Check if the requested URL is the home page "/"
    if (req.url === '/') {
        // req.url holds the path the browser requested (e.g. '/', '/about', '/contact')

        // Send the home page response and stop executing further code
        return res.end('this is the home page');
        // res.end() sends the response body AND signals that the response is complete
        // 'return' prevents the code below from running (acts as an early exit)

        // This commented line does nothing — res.end() with no argument was the old approach
        // res.end()
    }

    // Check if the requested URL is "/about"
    if (req.url === '/about') {

        // Send the about page response and stop executing further code
        return res.end('this is the about page');
        // Same as above — 'return' ensures we don't fall through to the error handler
    }

    // If the URL is neither "/" nor "/about",
    // we send a custom HTML error page as the response
    res.end(`
         <h1>Oops !!</h1>
         <p>this is not working</p>
         <a href="/"> back home</a>
        `);
    // Template literal allows multi-line HTML — the browser will render this as a web page
    // The anchor tag lets the user click "back home" to return to "/"
});

// Start the server and listen for incoming requests on port 5000
server.listen(5000);  // the server is now active at http://localhost:5000
                       // every browser request to that address triggers the callback above