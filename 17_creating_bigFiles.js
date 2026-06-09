const { writeFileSync } = require('fs');
// loads 'writeFileSync' from Node.js built-in 'fs' module
// writeFileSync is SYNCHRONOUS — it blocks until writing is complete before moving to the next iteration
// This is intentional here: we want each write to finish before the next loop runs

for (let x = 0; x < 10000; x++) {
    // starts a loop that runs 10,000 times — x goes from 0 to 9999
    // each iteration writes one line to the file

    writeFileSync('./content/big.txt', `hello world ${x}\n`, { flag: 'a' })
    // writes to './content/big.txt' on EVERY single iteration
    // `hello world ${x}\n` — a template literal:
    //   - 'hello world' is the text
    //   - ${x} is the current loop number (0, 1, 2, ... 9999)
    //   - '\n' is a newline character — puts each entry on its own line
    // { flag: 'a' } = append mode — adds to the END of the file without erasing existing content
    // without { flag: 'a' }, every iteration would OVERWRITE the file (only the last line would remain!)

    // WARNING: This uses Sync writes in a loop — it BLOCKS the event loop 10,000 times
    // It will create a big.txt file with 10,000 lines — used by 18_http_stream.js to demo streaming
}
// After the loop: big.txt will contain:
// hello world 0
// hello world 1
// ...
// hello world 9999