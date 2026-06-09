# 📝 Notes: 17 & 18 — Streams & Big Files

## 🔑 Key Concepts (Easy to Remember)

| | `readFile()` | `createReadStream()` |
|--|-------------|---------------------|
| **How it reads** | Loads the **entire file into RAM** at once | Reads file in **small chunks** (64KB each) |
| **Memory use** | HIGH — can crash with very large files | LOW — only one chunk in memory at a time |
| **Speed** | Slower for large files | Faster — starts processing immediately |
| **Best for** | Small files (configs, templates) | Large files (videos, logs, big datasets) |
| **Events** | Callback-based | `'data'`, `'end'`, `'error'` events |

> 💡 **Memory Trick**: `readFile` = eating the whole pizza at once. `createReadStream` = eating slice by slice. Eating slice by slice is easier on your stomach (RAM).

---

## 📌 Must-Know Points

### `17_creating_bigFiles.js`
- Writes 10,000 lines to `big.txt` — each line is `hello world {x}`.
- Uses `{ flag: 'a' }` (append) so each iteration ADDS to the file instead of overwriting.
- Uses `writeFileSync` in a loop — **blocks the event loop 10,000 times**.
- This is acceptable here because it's a one-time setup script, not a server handler.
- **Run this first** before running `18_http_stream.js`.

### `18_http_stream.js`
- `createReadStream()` emits a `'data'` event for each chunk (64KB by default).
- For a file with 10,000 lines, `'data'` fires multiple times.
- The `result` in the `'data'` callback is a **Buffer** — raw bytes, not a string.
  ```js
  stream.on('data', (result) => {
    console.log(result.toString()); // convert Buffer to string to read it
  })
  ```
- To listen for when all chunks are delivered, use the `'end'` event:
  ```js
  stream.on('end', () => console.log('File fully read'));
  ```

### Stream Events
| Event | When it fires |
|-------|--------------|
| `'data'` | Each time a new chunk is ready |
| `'end'` | When all data has been read |
| `'error'` | When something goes wrong (file missing, permission denied) |

### Piping — the most powerful stream feature
```js
// Instead of manually handling chunks, pipe the stream to a response:
const server = http.createServer((req, res) => {
  const stream = createReadStream('./content/big.txt');
  stream.pipe(res); // streams directly to the browser — super efficient!
});
```
`.pipe()` connects a readable stream to a writable stream (like `res`) — chunks flow automatically.

---

## 🐛 Bugs / Errors — What, How, When

### ❌ `ENOENT: no such file or directory` in 18_http_stream.js
- **What**: `big.txt` doesn't exist yet.
- **How**: You run `18_http_stream.js` before running `17_creating_bigFiles.js`.
- **Fix**: Run `17` first: `node 17_creating_bigFiles.js` → then `node 18_http_stream.js`.

### ❌ `result` in `'data'` event is a Buffer, not a string
- **What**: `console.log(result)` prints `<Buffer 68 65 6c 6c 6f ...>` instead of readable text.
- **How**: `createReadStream` returns raw bytes by default.
- **Fix**: Pass `'utf8'` encoding: `createReadStream('./big.txt', { encoding: 'utf8' })`, or call `result.toString()` inside the `'data'` listener.

### ❌ Using `readFile` on a very large file — out of memory
- **What**: Node.js crashes or freezes because it tries to load the entire file at once.
- **How**: `readFile('./very-large-video.mp4', ...)` — the file is several GB.
- **Fix**: Use `createReadStream()` and pipe to the response.

### ❌ `writeFileSync` in a loop blocks the process
- **What**: 10,000 synchronous write calls block the event loop for the entire duration.
- **How**: In `17_creating_bigFiles.js` — intentional for a one-time setup script.
- **When**: Only a problem if done inside a server request handler.
- **Fix**: For server contexts, use async streams or `fs.promises.writeFile`.

---

## 🎤 Interview Questions & Answers

**Q1: What is a Stream in Node.js?**
> A: A Stream is an abstraction for working with data that is read or written sequentially over time — in chunks, rather than all at once. Node.js has 4 types: Readable, Writable, Duplex (both), and Transform (duplex that modifies data).

**Q2: Why use `createReadStream` instead of `readFile` for large files?**
> A: `readFile` loads the entire file into memory before giving it to you — for a 2GB file, you need 2GB of free RAM. `createReadStream` reads in small chunks (64KB), so memory usage stays constant regardless of file size.

**Q3: What is a Buffer in Node.js?**
> A: A Buffer is a fixed-size chunk of raw binary memory outside the V8 heap. Used for handling binary data like file contents, network packets, and streams. Convert to string with `.toString()` or `.toString('utf8')`.

**Q4: What is `.pipe()` and why is it useful?**
> A: `.pipe(dest)` connects a Readable stream to a Writable stream and automatically manages the flow of data chunks between them. Example: `fs.createReadStream('./file').pipe(res)` — streams a file directly to an HTTP response without loading it all into memory.

**Q5: What events does a readable stream emit?**
> A: `'data'` (chunk ready), `'end'` (all data delivered), `'error'` (something went wrong), `'close'` (stream/resource closed), `'readable'` (data is available to be read manually).

**Q6: What is the difference between `0o7` and `7` in JavaScript?**
> A: `0o7` is octal (base-8) notation — the `0o` prefix tells JavaScript to interpret the number in base 8. `0o7` equals `7` in decimal. `0o10` would equal `8` in decimal. This appears in `15_event_emitter.js` as the `id` argument.
