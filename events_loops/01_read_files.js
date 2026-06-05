const { log } = require('console');       // shortcut: log = console.log (not actually used below)
const { readFile, writeFile } = require('fs');  // loads async (callback-based) file methods from 'fs'
const { result } = require('lodash');     // BUG: 'result' is not a top-level export from lodash this way
                                           // This silently gives undefined — it's an unused import
                                           // FIX: Remove this line

console.log('started as first task');     // runs IMMEDIATELY — synchronous, no waiting

readFile('../content/first.txt', 'utf8', (err, result) => {
    // starts reading first.txt asynchronously
    // '../content/' = go up one folder from events_loops/ to backend_freeCodeCamp/content/
    // callback fires when done: 'err' = error (or null), 'result' = file content

    if (err) {
        console.log(er);    // BUG: 'er' is not defined — should be 'err' (with double 'r')
                             // This will throw: ReferenceError: er is not defined
                             // FIX: Change 'er' → 'err'
        return;              // exits the callback early so nothing below runs
    }
    console.log(result);              // prints the content of first.txt
    console.log('completed first task'); // runs only AFTER file is fully read and no error occurred
})

// This line runs BEFORE the file is even read — Node.js doesn't wait
console.log('starting next task');    // prints immediately after readFile is called (non-blocking)
                                       // Expected output order:
                                       // 1. 'started as first task'
                                       // 2. 'starting next task'
                                       // 3. (file content)
                                       // 4. 'completed first task'
