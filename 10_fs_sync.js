const { log } = require('console');                      // shortcut for console.log
const { readFileSync, writeFileSync } = require('fs');   // loads sync file methods from 'fs' module
                                                          // readFileSync  → reads a file and BLOCKS until done
                                                          // writeFileSync → writes a file and BLOCKS until done

console.log('start');  // prints 'start' — this is the first thing to run

const first = readFileSync('./content/first.txt', 'utf8');
// readFileSync BLOCKS the entire program here — nothing else runs until first.txt is fully read
// './content/first.txt' → the path to the file (relative to where you run the script)
// 'utf8'                → the encoding — tells Node.js to return a string instead of a Buffer
// 'first' will hold the text content of first.txt

const second = readFileSync('./content/second.txt', 'utf8');
// again, Node.js BLOCKS here until second.txt is completely read
// 'second' will hold the text content of second.txt

writeFileSync(
    './content/result-sync.txt',             // path to the output file (created if it doesn't exist)
    `\nhere is the result: ${first}, ${second}`, // content to write — combines both file contents
    /** flag: 'a' means append mode. New content is added at the end of the file
        and the existing content is preserved. If the file doesn't exist, it creates one. */
    { flag: 'a' }                            // options object — 'a' = append (don't overwrite)
)
// console.log(first, second);  // uncomment to see both file contents in the terminal

const result = readFileSync('./content/result-sync.txt', 'utf8');
// reads the file we just wrote — BLOCKS again until done
// 'result' will hold the full text of result-sync.txt
// console.log(result);  // uncomment to see the result file's content

console.log('done with the task');       // runs only AFTER all file operations finish (sync = sequential)
console.log('starting with the new one'); // final message — everything above completed before this ran
