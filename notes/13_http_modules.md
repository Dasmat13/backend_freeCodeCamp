# 📝 Notes: 13_http_modules.js — Building an HTTP Server

## 🔑 Key Concepts (Easy to Remember)

| Term | What it is |
|------|-----------|
| `http.createServer(cb)` | Creates a server that calls `cb` on every request |
| `req` (request) | What the **client sent** — URL, method, headers |
| `res` (response) | What you **send back** — text, HTML, status code |
| `req.url` | The path the browser requested (e.g. `/`, `/about`) |
| `res.end(data)` | Sends the response body and **ends the response** |
| `server.listen(port)` | Starts the server on the given port |

> 💡 **Memory Trick**: `req` = REQUEST (comes IN). `res` = RESPONSE (goes OUT). One server, one callback, every request goes through it.

---

## 📌 Must-Know Points

- `http` is a **built-in module** — no npm install needed.
- **Every request** hits the same callback — you use `req.url` to route manually.
- `return res.end(...)` — the `return` is important! It stops the function from running other `if` blocks.
- Without `return`, multiple `res.end()` calls can cause:  
  `Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client`
- `res.end()` accepts a **string** or **Buffer** as the body.
- You can send HTML: `res.end('<h1>Hello</h1>')` — the browser renders it.
- Default port conventions: `3000`, `5000`, `8080` for development. Port `80` for HTTP production.

---

## 🐛 Bugs / Errors — What, How, When

### ❌ Duplicate `const http` declaration (BUG in original file)
- **What**: `http` and `server` were declared twice — Node.js throws `SyntaxError: Identifier 'http' has already been declared`.
- **How**: The original file had an old draft followed by a clean version — both used the same variable names.
- **When**: Happens when you paste new code without removing the old version.
- **Fix**: Delete the first (draft) block and keep only the clean commented version.

### ❌ `ERR_HTTP_HEADERS_SENT` / `ERR_STREAM_WRITE_AFTER_END`
- **What**: You called `res.end()` twice for the same request.
- **How**: Missing `return` before `res.end()` causes code to fall through to the next `res.end()`.
- **When**: Common in routing logic without proper `return` statements.
- **Fix**: Always use `return res.end(...)` to stop execution after sending a response.

### ❌ Server doesn't stop when you close the terminal
- **What**: `server.listen()` keeps the process alive.
- **Fix**: Stop with `Ctrl+C` in the terminal. Or call `server.close()` programmatically.

### ❌ Port already in use — `Error: listen EADDRINUSE: address already in use :::5000`
- **What**: Another process is already using port 5000.
- **Fix**: Kill the other process (`lsof -i :5000` then `kill -9 <PID>`) or use a different port.

---

## 🎤 Interview Questions & Answers

**Q1: How do you create a basic HTTP server in Node.js without Express?**
```js
const http = require('http');
const server = http.createServer((req, res) => {
  res.end('Hello World');
});
server.listen(3000);
```

**Q2: What is `req.url` and what does it contain?**
> A: `req.url` is the URL path the browser requested — e.g. `/`, `/about`, `/users/1`. It does NOT include the domain or port, just the path and query string.

**Q3: Why do we use `return res.end()` instead of just `res.end()`?**
> A: Without `return`, code continues to execute after `res.end()`, potentially calling it again. Calling `res.end()` twice throws `ERR_HTTP_HEADERS_SENT`. The `return` exits the callback immediately.

**Q4: What is the difference between a Node.js HTTP server and Express?**
> A: Node's `http` module is the raw, low-level server. Express is a framework built on top of it that adds routing, middleware, request parsing, error handling, and more — all in a cleaner API.

**Q5: What port should you use for development vs production?**
> A: Development: `3000`, `5000`, or `8080` (any unprivileged port). Production HTTP: `80`. Production HTTPS: `443`. Ports below 1024 require root/admin privileges.
