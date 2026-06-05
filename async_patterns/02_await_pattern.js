const { readFile, writeFile } = require('fs').promises
// loads 'readFile' and 'writeFile' directly from the PROMISES version of 'fs'
// fs.promises gives you Promise-based versions of all file methods
// This is the modern way — no callbacks, no need for util.promisify()

const { log } = require('console')       // shortcut: log = console.log
const { resolve } = require('dns')       // BUG: imports 'resolve' from the 'dns' module (domain name lookup)
                                           // This is NOT related to file operations or Promises
                                           // It's an unused, incorrect import — should be removed
                                           // FIX: Delete this line entirely
const { reject, result } = require('lodash')  // BUG: lodash does not export 'reject' or 'result' this way
                                               // This will silently give undefined for both variables
                                               // FIX: Delete this line — it's not needed here

// const util = require('util')                  // 'util' module — not needed when using fs.promises directly
// const readFilePromise = util.promisify(readFile)   // util.promisify converts callback functions to Promises
// const writeFilepromise = util.promisify(writeFile)  // old approach — fs.promises is cleaner now

// ─────────────────────────────────────────────────────────────────────────────
// Main async function — reads two files, writes combined result, then logs
// ─────────────────────────────────────────────────────────────────────────────
const start = async () => {
    // 'async' means this function returns a Promise and can use 'await' inside

    try {
        // 'try' block — code that might fail goes here
        // if any 'await' throws, execution jumps to the 'catch' block

        const first = await readFile('../content/first.txt', 'utf8')
        // 'await' pauses here until first.txt is fully read
        // '../content/' means go UP one folder (out of async_patterns/) into backend_freeCodeCamp/content/
        // 'utf8' → return text string instead of raw binary Buffer
        // 'first' holds the text of first.txt

        const second = await readFile('../content/second.txt', 'utf8')
        // same as above — reads second.txt
        // pauses here until second.txt is fully read
        // 'second' holds the text of second.txt

        await writeFile(
            '../content/result-pattern.txt',          // file path to create/update (in content/ folder)
            `THIS IS AWESOME : ${first} ${second}`,   // template literal — combines both file contents
            { flag: 'a' }                              // append mode — adds to end of file, doesn't erase it
        )
        // 'await' pauses here until the file is fully written
        // if write fails, the error is caught by the 'catch' block

        console.log(first, second);  // prints both file contents AFTER everything succeeds
                                      // this only runs if BOTH reads and the write all succeeded

    } catch (error) {
        // 'catch' runs if ANY of the 'await' calls above throws an error
        // 'error' holds the Error object with details about what went wrong
        console.log(error);  // prints the error — useful for debugging (though console.error is better practice)
    }
}

start()  // calls the async function — nothing runs until you call it

// ─────────────────────────────────────────────────────────────────────────────
// COMMENTED OUT: Promise-chain version of getText (manual promisify approach)
// This is the older way to wrap a callback-based function in a Promise
// ─────────────────────────────────────────────────────────────────────────────
// const getText = (path) => {
//     return new Promise((resolve, reject) => {
//         readFile(path, 'utf8', ((err, data) => {  // callback-style readFile
//             if (err) {
//                 reject(err)    // if error, reject the Promise
//             }
//             else {
//                 resolve(data)  // if success, resolve the Promise with the file content
//             }
//         })
//     })
// }

// getText('../content/first.txt')
// .then((result) => console.log(result))  // .then runs if Promise resolves
// .catch((err) => console.log(err);       // BUG: missing closing ')' — syntax error
// )