# 📚 Notes — Node.js Backend (freeCodeCamp)

A complete study guide for every file in this repo.  
Each note file contains: key concepts, must-know points, common bugs (what/how/when/fix), and interview Q&A.

---

## 📂 Notes Index

| Note File | Covers | Topics |
|-----------|--------|--------|
| [01_intro.md](./01_intro.md) | `01_intro.js` | Node.js globals: `__dirname`, `__filename`, `require`, `module`, `process` |
| [02_global.md](./02_global.md) | `02_global.js` | The `global` object, var vs let/const scoping |
| [03_modules.md](./03_modules.md) | `03` → `07` | CommonJS module system, `require`, `module.exports`, Module Wrapper Function |
| [08_os_module.md](./08_os_module.md) | `08_os_modules.js` | `os` module — userInfo, uptime, memory, OS type |
| [09_path_module.md](./09_path_module.md) | `09_path_module.js` | `path` module — join, resolve, basename, sep |
| [10_11_fs_sync_async.md](./10_11_fs_sync_async.md) | `10_fs_sync.js`, `11_fs_async.js` | File system sync vs async, callbacks, flags, callback hell |
| [12_diff_sync_async.md](./12_diff_sync_async.md) | `12_diff_btw_sync_and_async` | Side-by-side comparison, execution order proof |
| [13_http_modules.md](./13_http_modules.md) | `13_http_modules.js` | HTTP server, routing, req/res, ports, ERR_HEADERS_SENT |
| [14_npm_basic.md](./14_npm_basic.md) | `14_npm_basic.js` | npm, package.json, lodash, flatMapDeep |
| [app_promises_async.md](./app_promises_async.md) | `app.js` | Promises, new Promise, async/await, error handling |
| [async_patterns.md](./async_patterns.md) | `async_patterns/` | Blocking servers, fs.promises, await pattern, bug inventory |
| [events_loops.md](./events_loops.md) | `events_loops/` | Event loop, setTimeout, setInterval, event-driven server |
| [15_event_emitter.md](./15_event_emitter.md) | `15_event_emitter.js` | EventEmitter — `.on()`, `.emit()`, custom events, Observer pattern |
| [16_request_event.md](./16_request_event.md) | `16_request_event.js` | HTTP server as EventEmitter — explicit `'request'` event style |
| [17_18_streams.md](./17_18_streams.md) | `17_creating_bigFiles.js`, `18_http_stream.js` | Streams, chunks, Buffer, `.pipe()`, readFile vs createReadStream |

---

## 🐛 All Bugs Found — Quick Reference

| File | Bug | Fix |
|------|-----|-----|
| `13_http_modules.js` | `http` and `server` declared twice (duplicate block) | Delete the first draft block |
| `async_patterns/01_block.js` | Route `'./about'` never matches browser URL | Change to `'/about'` |
| `async_patterns/02_await_pattern.js` | Imports `resolve` from `'dns'` — wrong module | Remove the line |
| `async_patterns/02_await_pattern.js` | Imports `reject, result` from `'lodash'` — wrong | Remove the line |
| `async_patterns/02_await_pattern.js` | `.catch((err) => console.log(err);` — syntax error | Fix to `.catch((err) => console.log(err))` |
| `app.js` | `const { result } = require('lodash')` — unused wrong import | Remove the line |
| `events_loops/01_read_files.js` | `console.log(er)` — `er` is not defined | Change to `console.log(err)` |
| `events_loops/01_read_files.js` | `const { result } = require('lodash')` — unused | Remove the line |
| `events_loops/03_setInterval.js` | Typo: `'frist'` | Change to `'first'` |
| `events_loops/04_server.js` | Typo: `'listing'` | Change to `'listening'` |
| `14_npm_basic.js` | Typo in data: `'webcame'` | Change to `'webcam'` |
| `15_event_emitter.js` | Typo: `'damsat'` instead of `'dasmat'` | Change `'damsat'` → `'dasmat'` |

---

## ⚡ Quick Cheat Sheet

```js
// ─── GLOBALS ───────────────────────────────────
__dirname               // path to current folder
__filename              // path to current file
require('./module')     // import a module
module.exports = value  // export from a file

// ─── MODULES ───────────────────────────────────
module.exports = { a, b }         // export multiple
module.exports.key = value        // export one at a time
const { a, b } = require('./x')   // destructured import

// ─── FILE SYSTEM ───────────────────────────────
const { readFileSync, writeFileSync } = require('fs')   // sync
const { readFile, writeFile }         = require('fs')   // async (callback)
const { readFile, writeFile }         = require('fs').promises  // async (Promise)

// ─── ASYNC/AWAIT ───────────────────────────────
const start = async () => {
  try {
    const data = await readFile('./file.txt', 'utf8')
    console.log(data)
  } catch (err) {
    console.error(err)
  }
}
start()

// ─── HTTP SERVER ───────────────────────────────
const http = require('http')
const server = http.createServer((req, res) => {
  if (req.url === '/') return res.end('Home Page')
  if (req.url === '/about') return res.end('About Page')
  res.end('Not Found')
})
server.listen(5000)

// ─── EVENT LOOP ORDER ──────────────────────────
console.log('1 - sync')
setTimeout(() => console.log('3 - async timer'), 0)
console.log('2 - sync')
// Output: 1 → 2 → 3

// ─── EVENT EMITTER ──────────────────────────────
const EventEmitter = require('events')
const emitter = new EventEmitter()
emitter.on('data', (val) => console.log('received:', val))  // listen
emitter.emit('data', 42)                                     // fire → prints: received: 42

// ─── STREAMS ────────────────────────────────────
const { createReadStream } = require('fs')
const stream = createReadStream('./file.txt', { encoding: 'utf8' })
stream.on('data', chunk => console.log(chunk))  // fires for each 64KB chunk
stream.on('end', () => console.log('done'))     // fires once all data is read
stream.on('error', err => console.error(err))   // fires on any error

// ─── PIPE (stream shortcut) ─────────────────────
const http = require('http')
http.createServer((req, res) => {
  createReadStream('./big.txt').pipe(res)  // streams file directly to browser
}).listen(5000)
```

---

## 🎤 Top Interview Questions — Quick Answers

| Question | Answer (one line) |
|----------|-------------------|
| What is the Event Loop? | Picks async callbacks from the queue and runs them when the call stack is empty |
| Why avoid `readFileSync` in servers? | It blocks ALL requests while reading — freezes the server |
| What is callback hell? | Deeply nested callbacks — fix with `async/await` |
| `module.exports` vs `exports`? | `exports` is a shortcut — never reassign it directly |
| Does Node have `window`? | No — use `global`. But prefer explicit imports |
| What is `{flag: 'a'}`? | Append mode — adds content to end of file without overwriting |
| What is a Promise? | An object for a future value: pending → resolved or rejected |
| `setTimeout(fn, 0)` runs before sync? | No — always runs AFTER all synchronous code |
| What is EventEmitter? | Core Node.js class — emit named events, listeners react to them |
| `.on()` vs `.once()`? | `.on()` = persistent listener. `.once()` = fires once then removes itself |
| `readFile` vs `createReadStream`? | readFile = all in RAM. createReadStream = chunks, low memory |
| What is a Buffer? | Raw binary data in memory — convert with `.toString()` |
| What does `.pipe()` do? | Connects readable stream to writable — data flows automatically |

---

*Study tip: Read a `.js` file, run it with `node filename.js`, then read its note file to understand what happened.*
