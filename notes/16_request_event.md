# 📝 Notes: 16_request_event.js — HTTP Server as EventEmitter

## 🔑 Key Concepts (Easy to Remember)

| Style | Code |
|-------|------|
| **Shorthand** (common) | `http.createServer((req, res) => { ... })` |
| **Event emitter** (explicit) | `server.on('request', (req, res) => { ... })` |

> 💡 **Memory Trick**: Both styles do the EXACT same thing. The shorthand is just syntactic sugar — under the hood, Node registers your callback as a `'request'` event listener.

---

## 📌 Must-Know Points

- `http.Server` **extends** `EventEmitter` — an HTTP server IS an event emitter.
- The `'request'` event fires on **every incoming HTTP request**.
- You can register **multiple** `'request'` listeners — they all run on each request.
- Other built-in server events you can listen to:

| Event | When it fires |
|-------|--------------|
| `'request'` | Every time a client sends a request |
| `'listening'` | When `server.listen()` is ready |
| `'close'` | When the server stops accepting connections |
| `'error'` | When an error occurs (e.g., port already in use) |
| `'connection'` | When a new TCP connection is established |

### Example with multiple events:
```js
const server = http.createServer();

server.on('request', (req, res) => res.end('Hello!'));

server.on('listening', () => console.log('Server is ready'));

server.on('error', (err) => console.error('Server error:', err));

server.listen(5000);
```

---

## 🐛 Bugs / Errors — What, How, When

### ❌ Port already in use — `EADDRINUSE`
- **What**: `Error: listen EADDRINUSE: address already in use :::5000`
- **How**: Another process (or a previous run of this file) is already using port 5000.
- **When**: You forget to kill the previous server before re-running.
- **Fix**:
  ```bash
  lsof -i :5000        # find the process using port 5000
  kill -9 <PID>        # kill it
  ```
  Or: add `server.on('error', (err) => { if (err.code === 'EADDRINUSE') { ... } })`.

### ❌ No response — browser hangs
- **What**: Browser keeps loading but never gets a response.
- **How**: You registered `.on('request', ...)` but forgot to call `res.end()`.
- **Fix**: Always call `res.end()` (or `res.send()` in Express) inside every request handler.

---

## 🎤 Interview Questions & Answers

**Q1: How is an HTTP server related to EventEmitter in Node.js?**
> A: `http.Server` extends `net.Server` which extends `EventEmitter`. So every HTTP server is an event emitter. The `'request'` event is emitted on every incoming connection, and your callback (whether passed to `createServer()` or via `.on('request', cb)`) is just an event listener.

**Q2: What is the difference between passing a callback to `createServer()` vs using `.on('request', cb)`?**
> A: They're functionally identical. `http.createServer(cb)` is shorthand — internally it calls `server.on('request', cb)`. The explicit `.on()` style is just more verbose and makes the event-driven nature clearer.

**Q3: Can you have multiple `'request'` listeners on an HTTP server?**
> A: Yes. Every `.on('request', cb)` adds another listener. All run for each request, in registration order. In practice, Express handles routing so you only need one listener.

**Q4: What event should you always listen to on a server to prevent crashes?**
> A: The `'error'` event. If you don't handle it, Node.js throws an uncaught exception and crashes the entire process. Always add: `server.on('error', (err) => console.error(err))`.
