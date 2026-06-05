# 📝 Notes: events_loops/ — The Event Loop, Timers & Event-Driven Servers

## 🔑 Key Concepts (Easy to Remember)

| File | What it demonstrates |
|------|---------------------|
| `01_read_files.js` | Async file I/O and non-blocking execution order |
| `02_setTimeout.js` | `setTimeout(fn, 0)` — still runs AFTER synchronous code |
| `03_setInterval.js` | `setInterval` — repeating timers run AFTER sync code |
| `04_server.js` | Event-driven HTTP server — requests trigger events |

> 💡 **Memory Trick**: The Event Loop says — "Finish all synchronous work first. Then handle async callbacks, timers, and I/O." Think of it as a traffic cop: sync code gets priority, async waits at the intersection.

---

## 📌 Must-Know Points

### The Node.js Event Loop (Simplified)
```
Call Stack → Node APIs (async work) → Callback Queue → Event Loop → Call Stack
```
1. Synchronous code runs on the **call stack** first.
2. Async operations (file reads, timers) are handed to **Node APIs** (C++ internals / OS).
3. When done, their callbacks go to the **callback queue**.
4. The **event loop** picks callbacks from the queue and pushes them to the call stack — but ONLY when the call stack is empty.

### `02_setTimeout.js` — The 0ms Trick
```js
console.log('first');     // ← synchronous: runs immediately
setTimeout(() => {
  console.log('second'); // ← async: runs AFTER call stack clears
}, 0);
console.log('third');    // ← synchronous: runs before setTimeout callback!

// Output: first → third → second
```
Even with `0ms`, `setTimeout` goes through the event loop queue — it NEVER runs before synchronous code.

### `03_setInterval.js` — Repeating Timer
- `setInterval(fn, 2000)` runs `fn` every 2 seconds — **forever**.
- Synchronous code after `setInterval` still runs first.
- To stop: `const id = setInterval(...); clearInterval(id)`.
- The process stays alive as long as `setInterval` is active.

### `04_server.js` — Event-Driven Model
- The HTTP server is an **event emitter** — it emits a `'request'` event on every incoming connection.
- `http.createServer(cb)` registers `cb` as the listener for `'request'` events.
- The server keeps the event loop alive indefinitely — it never exits until you `Ctrl+C`.

---

## 🐛 Bugs / Errors — What, How, When

### ❌ Bug in `01_read_files.js`: `console.log(er)` — typo
- **What**: Variable `er` is not defined — should be `err`.
- **How**: Simple typo — missing the second `r`.
- **When**: Node.js throws `ReferenceError: er is not defined` when a file read fails.
- **Fix**: Change `console.log(er)` → `console.log(err)`.

### ❌ Unused import in `01_read_files.js`: `const { result } = require('lodash')`
- **What**: `result` from lodash is not used anywhere in this file.
- **Fix**: Remove this import line.

### ❌ Typo in `03_setInterval.js`: `'frist'` instead of `'first'`
- **What**: `console.log('i will run frist')` — `'frist'` is a typo.
- **Fix**: Change `'frist'` → `'first'`.

### ❌ Typo in `04_server.js`: `'listing'` instead of `'listening'`
- **What**: `console.log('server listing on port : 5000....')` — `'listing'` should be `'listening'`.
- **Fix**: Change `'listing'` → `'listening'`.

### ❌ `setInterval` runs forever — process never exits
- **What**: By design — `setInterval` keeps the Node process alive.
- **When**: You forget to clear it when done.
- **Fix**: Store the return value and call `clearInterval(id)` when appropriate.

---

## 🎤 Interview Questions & Answers

**Q1: What is the Node.js Event Loop?**
> A: The Event Loop is the mechanism that allows Node.js to perform non-blocking I/O. It continuously checks if the call stack is empty, and if so, it picks up the next callback from the callback queue and pushes it onto the call stack to execute.

**Q2: Why does `setTimeout(fn, 0)` still run after synchronous code?**
> A: Because even with 0ms delay, `setTimeout` is asynchronous — it goes through the timer phase of the event loop. The event loop only picks it up AFTER the call stack is empty (i.e., all synchronous code has finished running).

**Q3: What is the difference between `setTimeout` and `setInterval`?**
> A: `setTimeout` executes the callback **once** after a delay. `setInterval` executes the callback **repeatedly** at a fixed interval. Both are async and go through the event loop's timer queue.

**Q4: How do you stop a `setInterval`?**
> A: Store the ID returned by `setInterval`, then call `clearInterval(id)`:
```js
const id = setInterval(() => console.log('tick'), 1000);
setTimeout(() => clearInterval(id), 5000); // stops after 5 seconds
```

**Q5: What does it mean that Node.js is "event-driven"?**
> A: Node.js uses an event emitter pattern — objects emit named events, and registered listeners respond to them. The HTTP server emits a `'request'` event on every incoming connection. Instead of blocking and waiting for connections, Node registers a listener and handles each request when the event fires.

**Q6: What are the phases of the Node.js Event Loop?**
> A: Simplified phases:
> 1. **Timers** — runs `setTimeout` and `setInterval` callbacks
> 2. **Pending I/O** — I/O callbacks from previous iterations
> 3. **Idle/Prepare** — internal use
> 4. **Poll** — retrieves new I/O events (file reads, network)
> 5. **Check** — runs `setImmediate` callbacks
> 6. **Close** — cleanup callbacks (e.g., socket close)

**Q7: What is the difference between `setTimeout(fn, 0)` and `setImmediate(fn)`?**
> A: Both run the callback asynchronously "as soon as possible", but:
> - `setTimeout(fn, 0)` runs in the **Timers phase**.
> - `setImmediate(fn)` runs in the **Check phase** (after I/O polling).
> In practice, inside an I/O callback, `setImmediate` always runs before `setTimeout(fn, 0)`.
