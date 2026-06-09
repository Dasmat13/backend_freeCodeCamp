# 📗 Node.js Backend — freeCodeCamp

A structured, hands-on Node.js learning repository — from globals and modules to async patterns, HTTP servers, EventEmitters, and Streams.  
Each file builds on the previous one, covering core backend concepts with runnable code examples and inline notes.

---

## 📂 Repository Structure

```
backend_freeCodeCamp/
├── 01_intro.js                → Node.js globals: __dirname, __filename, require
├── 02_global.js               → Global object exploration
├── 03_modules.js              → CommonJS module system basics
├── 04_names.js                → Exporting named values
├── 05_utils.js                → Exporting functions (module.exports)
├── 06_alternative-syntax.js   → Alternative export syntax
├── 07_mind_grenade.js         → Scope & invocation quirks
├── 08_os_modules.js           → Built-in `os` module
├── 09_path_module.js          → Built-in `path` module
├── 10_fs_sync.js              → File system — synchronous read/write
├── 11_fs_async.js             → File system — asynchronous (callbacks)
├── 12_diff_btw_sync_and_async → Sync vs Async comparison
├── 13_http_modules.js         → Creating an HTTP server
├── 14_npm_basic.js            → NPM basics & package management
├── 15_event_emitter.js        → EventEmitter — custom events with .on() and .emit()
├── 16_request_event.js        → HTTP server using explicit EventEmitter API
├── 17_creating_bigFiles.js    → Generates a 10,000-line big.txt for stream demo
├── 18_http_stream.js          → Streams — createReadStream, chunks, Buffer
├── app.js                     → Promise-based async file reader
├── async_patterns/            → Blocking server, async/await patterns
├── events_loops/              → Event loop: setTimeout, setInterval, servers
├── notes/                     → 📚 Study notes, bug tracker, interview Q&A
└── content/                   → Text files used for fs module exercises
```

---

## 📖 Topics Covered

### 📄 Root Files — Core Node.js Concepts
| File | Topic |
|------|-------|
| `01_intro.js` | Node.js globals — `__dirname`, `__filename`, `require` (no `window`!) |
| `02_global.js` | Exploring the Node.js global object |
| `03_modules.js` | CommonJS module system — every file is a module by default |
| `04_names.js` | Exporting named values with `module.exports` |
| `05_utils.js` | Exporting functions — `module.exports` default pattern |
| `06_alternative-syntax.js` | Inline exports with `module.exports.key = value` |
| `07_mind_grenade.js` | How wrapper functions and scope work in Node modules |
| `08_os_modules.js` | `os` module — user info, uptime, CPU, free memory |
| `09_path_module.js` | `path` module — `join()`, `basename()`, `resolve()`, separators |
| `10_fs_sync.js` | `fs.readFileSync` & `writeFileSync` — blocking I/O |
| `11_fs_async.js` | `fs.readFile` & `writeFile` — non-blocking callbacks |
| `12_diff_btw_sync_and_async` | Side-by-side comparison of sync vs async execution order |
| `13_http_modules.js` | `http.createServer()` — routing requests, sending responses |
| `14_npm_basic.js` | `npm` commands, local vs global dependencies, `package.json` |
| `15_event_emitter.js` | `EventEmitter` — `.on()`, `.emit()`, multiple listeners, Observer pattern |
| `16_request_event.js` | HTTP server built with explicit `server.on('request', ...)` event style |
| `17_creating_bigFiles.js` | Generates a 10,000-line file using `writeFileSync` in a loop |
| `18_http_stream.js` | `createReadStream` — reading large files in chunks, `'data'` & `'error'` events |
| `app.js` | Custom `getText()` utility using Promises + `async/await` |

### 📁 `async_patterns/` — Async Patterns in Depth
| File | Topic |
|------|-------|
| `01_block.js` | Blocking HTTP server — demonstrating why sync code freezes servers |
| `02_await_pattern.js` | `fs.promises` + `async/await` — clean async file reading |

### 📁 `events_loops/` — Event Loop & Timers
| File | Topic |
|------|-------|
| `01_read_files.js` | Async file I/O and order of task execution |
| `02_setTimeout.js` | `setTimeout` — event loop deferral with 0ms delay |
| `03_setInterval.js` | `setInterval` — recurring timer execution |
| `04_server.js` | HTTP server using the event-driven model |

---

## 🚀 How to Run

```bash
# Run any file with Node.js
node 01_intro.js

# Or run from inside a folder
cd async_patterns
node 02_await_pattern.js
```

---

## 🛠️ Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- Any code editor (VS Code recommended)

---

## 📦 Install Dependencies

```bash
npm install
```

---

## 📌 Key Takeaways

- ✅ Node.js has no `window` — globals like `__dirname` and `__filename` replace it
- ✅ Every file in Node.js is its own module (CommonJS by default)
- ✅ Use `module.exports` to share code between files
- ✅ Async (non-blocking) I/O is the Node.js way — avoid `Sync` methods in production
- ✅ The Event Loop handles timers (`setTimeout`, `setInterval`) after the call stack clears
- ✅ `async/await` over raw callbacks for cleaner, readable async code
- ✅ `http.createServer()` gives you full control over request/response handling

---

## 👤 Author

**Dasmat Hansda** — [@Dasmat13](https://github.com/Dasmat13)

---

## 📄 License

This project is for educational purposes. Feel free to fork and learn! 🎓
