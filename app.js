// ===============================
// Import asynchronous file methods
// ===============================
const { readFile, writeFile } = require('fs');

// ===============================
// Import synchronous file methods
// ===============================
const { readFileSync, writeFileSync } = require('fs');


// =====================================================================
// ASYNCHRONOUS VERSION (Non-Blocking)
// =====================================================================

// Print a message immediately
console.log('ASYNC: start');

// Start reading first.txt asynchronously
readFile('./content/first.txt', 'utf8', (err, first) => {

    // Check if an error occurred while reading first.txt
    if (err) {
        // Print the error
        console.error(err);

        // Stop executing this callback
        return;
    }

    // Start reading second.txt after first.txt is successfully read
    readFile('./content/second.txt', 'utf8', (err, second) => {

        // Check if an error occurred while reading second.txt
        if (err) {
            // Print the error
            console.error(err);

            // Stop executing this callback
            return;
        }

        // Write data to result-async.txt asynchronously
        writeFile(
            './content/result-async.txt',                    // File path
            `\nhere is the result: ${first}, ${second}`,     // Content to write
            { flag: 'a' },                                   // Append mode
            (err) => {                                       // Callback after write completes

                // Check if an error occurred while writing
                if (err) {
                    // Print the error
                    console.error(err);

                    // Stop executing this callback
                    return;
                }

                // Read the updated file asynchronously
                readFile('./content/result-async.txt', 'utf8', (err, result) => {

                    // Check if an error occurred while reading
                    if (err) {
                        // Print the error
                        console.error(err);

                        // Stop executing this callback
                        return;
                    }

                    // Print success message after all async work is done
                    console.log('ASYNC: done with the task');

                    // Print the file content
                    console.log(result);
                });
            }
        );
    });
});

// This line executes immediately without waiting for file operations
console.log('ASYNC: starting with the new one');


// =====================================================================
// SYNCHRONOUS VERSION (Blocking)
// =====================================================================

// Print a message
console.log('SYNC: start');

// Read first.txt completely before moving to the next line
const firstSync = readFileSync('./content/first.txt', 'utf8');

// Read second.txt completely before moving to the next line
const secondSync = readFileSync('./content/second.txt', 'utf8');

// Write content to result-sync.txt
// Node waits until writing is fully finished
writeFileSync(
    './content/result-sync.txt',                            // File path
    `\nhere is the result: ${firstSync}, ${secondSync}`,    // Content to write
    { flag: 'a' }                                           // Append mode
);

// Read result-sync.txt completely before moving on
const resultSync = readFileSync('./content/result-sync.txt', 'utf8');

// Print success message
console.log('SYNC: done with the task');

// Print the file content
console.log(resultSync);

// This line runs only after all synchronous operations finish
console.log('SYNC: starting with the new one');