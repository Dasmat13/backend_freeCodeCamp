const http = require('http');
const server = http.createServer((req,res)=> {


    if(req.url === '/'){
        return res.end('this is the home page')  //ERR_STREAM_WRITE_AFTER_END error. ✅
        //res.end()
    }

    if(req.url === '/about'){
        return res.end('this is the about page')
    }

    res.end(`
         <h1>Oops !!</h1>
         <p>this is not working</p>
         <a href="/"> back home</a>
        `);
})

server.listen(5000)



// Import the built-in HTTP module to create a web server
const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {

    // Check if the requested URL is the home page "/"
    if (req.url === '/') {

        // Send the home page response and stop executing further code
        return res.end('this is the home page');

        // This commented line does nothing
        // res.end()
    }

    // Check if the requested URL is "/about"
    if (req.url === '/about') {

        // Send the about page response and stop executing further code
        return res.end('this is the about page');
    }

    // If the URL is neither "/" nor "/about",
    // send a custom HTML error page
    res.end(`
         <h1>Oops !!</h1>
         <p>this is not working</p>
         <a href="/"> back home</a>
        `);
});

// Start the server and listen for incoming requests on port 5000
server.listen(5000);