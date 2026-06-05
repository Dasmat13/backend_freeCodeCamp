const { error } = require('console');        // destructures 'error' from 'console' (same as console.error)
const { readFile, writeFile } = require('fs') // loads async versions from 'fs' module
                                               // These do NOT block — they use CALLBACKS when done

console.log('start');  // prints 'start' immediately — Node.js doesn't wait for file reads

// ─────────────────────────────────────────────────────────────
// START: Read first.txt asynchronously
// ─────────────────────────────────────────────────────────────
readFile('./content/first.txt', 'utf8', (err, first) => {
    // readFile starts the file read and IMMEDIATELY moves on (non-blocking)
    // When the file is done reading, it calls this callback with (err, data)
    // 'err'   → error object if something went wrong, otherwise null
    // 'first' → the text content of first.txt if successful

    if (err) {            // checks if an error occurred
        console.error(err)  // prints the error to the terminal (in red if console supports it)
        return;             // stops this callback — don't execute anything below
    }

    // console.log(result);   // commented out — would print the raw result
    // const first = result;  // commented out — was an earlier draft (first is already named above)

    // ─────────────────────────────────────────────────────────────
    // NESTED: Read second.txt only AFTER first.txt is done
    // ─────────────────────────────────────────────────────────────
    readFile('./content/second.txt', 'utf8', (err, second) => {
        // reads second.txt — 'second' holds its content when done

        if (err) {            // checks if second.txt read failed
            console.error(err)  // prints the error
            return;             // exits this callback early
        }

        // console.log(result);  // commented out

        // ─────────────────────────────────────────────────────────────
        // NESTED: Write both results to result-async.txt
        // ─────────────────────────────────────────────────────────────
        writeFile(
            './content/result-async.txt',                     // path to output file
            `\n here is the result: ${first}, ${second}`,     // content — combines both file texts
            { flag: 'a' },                                     // append mode — don't overwrite existing content
            (err, result) => {                                 // callback after write completes
                                                               // NOTE: writeFile's callback only gives 'err' — result is undefined

                if (err) {            // checks if write failed
                    console.error(err)  // prints the error
                    return;             // exits early
                }

                // console.log("file written successfull !!")   // uncomment to confirm write
                // const resultAsync = result;                   // result here is always undefined for writeFile

                // ─────────────────────────────────────────────────────────────
                // NESTED: Read back the file we just wrote
                // ─────────────────────────────────────────────────────────────
                readFile('./content/result-async.txt', 'utf8', (err, result) => {
                    // reads back result-async.txt to verify the write worked

                    if (err) {            // checks if read failed
                        console.error(err);  // prints the error
                        return;              // exits early
                    }

                    console.log('done with the task');  // prints only after ALL nested async ops complete
                    // console.log(result)              // uncomment to see the file content
                });
            });
    });

});

// ─────────────────────────────────────────────────────────────
// This runs IMMEDIATELY — before any file is even read!
// This is the key difference from synchronous code.
// ─────────────────────────────────────────────────────────────
console.log('starting with the new one');  // prints BEFORE 'done with the task' (async = non-blocking)
