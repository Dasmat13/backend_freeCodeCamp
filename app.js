const {createReadStream} = require('fs')

const stream = createReadStream('./content/big.txt')
stream.on('data',(result)=>{
    console.log(result);
})
stream.on('error',(err)=>{
    console.log(err);
    
})

/**
 Why use createReadStream()?
❌ readFile()
const { readFile } = require('fs')

readFile('./content/big.txt', 'utf8', (err, data) => {
    console.log(data)
})
Loads the entire file into memory before giving it to you.
Not ideal for very large files.
✅ createReadStream()
const stream = createReadStream('./content/big.txt')
Reads the file piece by piece (chunks).
Uses less memory.
Faster for large files.
Commonly used for videos, logs, large datasets, and file downloads.
Events Used
"data"
stream.on('data', (result) => {
    console.log(result)
})
Fired whenever a new chunk is available.
Can fire many times for one file.
"error"
stream.on('error', (err) => {
    console.log(err)
})
Fired when something goes wrong.
Example:
File doesn't exist.
No permission to read file.

Example error:

Error: ENOENT: no such file or directory, open './content/big.txt'
 */