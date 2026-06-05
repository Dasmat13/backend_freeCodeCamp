const { readFile } = require('fs');       // loads only 'readFile' from the built-in 'fs' module
                                           // readFile uses callbacks (async)
const { result } = require('lodash');     // BUG: 'result' is NOT a function in lodash
                                           // lodash does not export a 'result' at the top level this way
                                           // This line will silently be 'undefined' — it won't crash but is unused
                                           // FIX: Remove this line — it's not needed here

// ─────────────────────────────────────────────────────────────────────────────
// getText — wraps the callback-based readFile inside a Promise
// This allows us to use .then()/.catch() OR async/await instead of nested callbacks
// ─────────────────────────────────────────────────────────────────────────────
const getText = (path) => {
    // Takes a file 'path' string as input
    // Returns a Promise — a promise is an object that represents a future value

    return new Promise((resolve, reject) => {
        // new Promise() takes an executor function with two parameters:
        // resolve(value) → call this when the operation succeeds (passes the value to .then())
        // reject(error)  → call this when the operation fails (passes error to .catch())

        readFile(path, 'utf8', (err, data) => {
            // reads the file at 'path' asynchronously
            // 'utf8' → return text instead of raw Buffer
            // callback runs when file is done reading

            if (err) {
                reject(err)   // file read failed → reject the Promise with the error
            }
            else {
                resolve(data); // file read succeeded → resolve the Promise with the file content
            }
        })
    })
}

// ─────────────────────────────────────────────────────────────────────────────
// Promise-chain style (commented out) — an alternative to async/await
// ─────────────────────────────────────────────────────────────────────────────
// getText('./content/first.txt')     // call getText → returns a Promise
// .then((result) => console.log(result))  // if resolved: print the file content
// .catch((err) => console.log(err))       // if rejected: print the error

// ─────────────────────────────────────────────────────────────────────────────
// async/await style — cleaner and easier to read than .then/.catch chains
// ─────────────────────────────────────────────────────────────────────────────
const start = async () => {
    // 'async' keyword makes this function always return a Promise
    // Inside an async function, you can use 'await' to pause and wait for Promises

    const first = await getText('./content/first.txt')
    // 'await' pauses here until getText resolves (file is read)
    // 'first' will hold the text content of first.txt
    // If it rejects, the error will propagate (consider wrapping in try/catch for safety)

    console.log(first);  // prints the content of first.txt to the terminal
}

start()  // immediately calls the async function to kick everything off
          // without calling start(), nothing happens — functions don't run themselves