# 📝 Notes: async_patterns/ — Blocking Servers & async/await

## 🔑 Key Concepts (Easy to Remember)

| File | What it demonstrates |
|------|---------------------|
| `01_block.js` | How **synchronous/blocking** code ruins server performance |
| `02_await_pattern.js` | The **modern async/await** pattern for file I/O |

> 💡 **Memory Trick**: "Block = Bad for servers." One heavy loop = ALL users frozen. Use async/await to keep the server responsive.

---

## 📌 Must-Know Points

### `01_block.js` — Blocking Server
- A `for` loop with 1,000 × 1,000 = **1,000,000 iterations** inside a request handler.
- While that loop runs, **no other request** can be processed — the event loop is frozen.
- This is a classic demo of WHY you should never do CPU-heavy work in request handlers.
- **Fix**: Move heavy work off the main thread using `worker_threads` or a background job queue.

### Bug in `01_block.js` — Wrong Route
```js
// ❌ Bug: './about' will NEVER match a browser URL
if (req.url === './about') { ... }

// ✅ Fix:
if (req.url === '/about') { ... }
```
Browser URLs always start with `/` — never `./`.

### `02_await_pattern.js` — Modern Async Pattern
- Uses `require('fs').promises` — the cleanest, modern way to do async file I/O.
- `async/await` + `try/catch` replaces deeply nested callbacks.
- **Three bugs in imports**:
  1. `const { resolve } = require('dns')` — wrong module, unused, delete it.
  2. `const { reject, result } = require('lodash')` — wrong module, unused, delete it.
  3. In commented-out code: `.catch((err) => console.log(err);` — missing `)` (syntax error if uncommented).

### The Three Ways to Do Async File I/O in Node.js

```js
// 1. Callbacks (old way — callback hell)
readFile('./file.txt', 'utf8', (err, data) => { ... });

// 2. util.promisify (middle ground)
const readFilePromise = util.promisify(readFile);
const data = await readFilePromise('./file.txt', 'utf8');

// 3. fs.promises (modern — cleanest)
const { readFile } = require('fs').promises;
const data = await readFile('./file.txt', 'utf8');
```

---

## 🐛 Bugs / Errors — What, How, When

### ❌ Route bug: `'./about'` instead of `'/about'`
- **What**: The `/about` route in `01_block.js` never matches.
- **How**: Wrote `'./about'` (a file path) instead of `'/about'` (a URL path).
- **When**: Easy mistake when mixing file paths and URL routing.
- **Fix**: Change `'./about'` → `'/about'`.

### ❌ Wrong imports in `02_await_pattern.js`
- **What**: `dns.resolve` and lodash `reject` imported but never used — causes confusion.
- **Fix**: Remove both incorrect import lines.

### ❌ Syntax error in commented `.catch()` block
- **What**: `.catch((err) => console.log(err);` has a misplaced semicolon inside the function call.
- **How**: The `;` should be inside or after the closing `)`.
- **Fix**: `.catch((err) => console.log(err))`

### ❌ Server freezes on `/about` request (01_block.js)
- **What**: The 1,000,000 iteration loop blocks the event loop for potentially seconds.
- **How**: Any synchronous heavy computation in a request handler.
- **When**: You visit `/about` in the browser — ALL other requests freeze until the loop finishes.
- **Fix**: Never run CPU-heavy code synchronously in a server. Use worker threads or async queues.

---

## 🎤 Interview Questions & Answers

**Q1: What is "blocking" in Node.js and why is it dangerous in a server?**
> A: Blocking means a synchronous operation occupies the call stack, preventing the event loop from processing any other events. In a server, this means ALL incoming requests freeze until the blocking code finishes — even a 1-second block can time out thousands of users.

**Q2: What is the difference between `fs.readFile` (callbacks), `util.promisify`, and `fs.promises`?**
> A: All three are async, but the API style differs:
> - `fs.readFile` uses callbacks (oldest, prone to callback hell)
> - `util.promisify(fs.readFile)` wraps it in a Promise (middle ground)
> - `fs.promises.readFile` is the modern, built-in Promise API (cleanest)

**Q3: Why is `try/catch` used with `async/await` instead of `.catch()`?**
> A: With `async/await`, you use `try/catch` because `await` turns a rejected Promise into a thrown error — so standard `try/catch` catches it. Both are valid, but `try/catch` reads more naturally alongside `await`.

**Q4: What happens if you `await` a rejected Promise inside a `try` block?**
> A: Execution immediately jumps to the `catch` block with the rejection reason as the error — just like a synchronous `throw` statement.

**Q5: What is `fs.promises` and when was it introduced?**
> A: `fs.promises` is the built-in Promise-based API for file system operations in Node.js. It was added in Node.js v10+ (stable in v11+). You access it as `require('fs').promises` or by importing `{ readFile } from 'fs/promises'` in newer Node versions.
