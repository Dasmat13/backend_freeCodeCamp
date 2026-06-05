# 📝 Notes: 10 & 11 — File System (Sync vs Async)

## 🔑 Key Concepts (Easy to Remember)

| | Synchronous (`Sync`) | Asynchronous (Callback) |
|--|---------------------|------------------------|
| **Function** | `readFileSync`, `writeFileSync` | `readFile`, `writeFile` |
| **Behavior** | **BLOCKS** — waits before moving on | **NON-BLOCKING** — moves on immediately |
| **Error handling** | `try/catch` | Check `err` in callback |
| **Use in production** | ❌ Never (freezes server) | ✅ Yes |
| **Use in scripts** | ✅ OK for simple scripts | ✅ Also fine |

> 💡 **Memory Trick**: "Sync = Stops. Async = Skips." — Sync waits for the file. Async skips ahead and comes back when done.

---

## 📌 Must-Know Points

### Synchronous (`10_fs_sync.js`)
- Code runs **line by line** — each operation must finish before the next starts.
- `readFileSync(path, 'utf8')` returns the file content as a **string** (because of `'utf8'`).
- Without `'utf8'`, it returns a **Buffer** (raw binary data).
- `{flag: 'a'}` in `writeFileSync` means **append** — new content is added to the END of the file.
- Without `{flag: 'a'}`, it **overwrites** the entire file every time.

### Asynchronous (`11_fs_async.js`)
- Code is **non-blocking** — `readFile` starts the operation and immediately moves to the next line.
- Callbacks are called when the file is done: `(err, data) => { ... }`.
- **Callback Hell** — nesting callbacks inside callbacks makes code hard to read:
  ```js
  readFile(f1, cb => {
      readFile(f2, cb => {
          writeFile(f3, cb => {
              readFile(f3, cb => { /* deeply nested */ })
          })
      })
  })
  ```
  **Fix**: Use `async/await` (see `app.js` and `async_patterns/02_await_pattern.js`).

### File Flags
| Flag | Meaning |
|------|---------|
| `'r'` | Read (default) — error if file doesn't exist |
| `'w'` | Write — **overwrites** existing content |
| `'a'` | Append — adds to END, creates file if it doesn't exist |
| `'r+'` | Read and write — error if file doesn't exist |

---

## 🐛 Bugs / Errors — What, How, When

### ❌ `Error: ENOENT: no such file or directory`
- **What**: The file path doesn't exist.
- **How**: Wrong path passed to `readFile` / `readFileSync`.
- **When**: Common mistake during development.
- **Fix**: Use `path.join(__dirname, 'content', 'file.txt')` instead of relative paths.

### ❌ Forgot `'utf8'` — got a Buffer instead of a string
- **What**: `readFileSync('./file.txt')` returns `<Buffer 68 65 6c ...>` not text.
- **Fix**: Always pass `'utf8'` as the second argument: `readFileSync('./file.txt', 'utf8')`.

### ❌ File keeps growing (forgot it was append mode)
- **What**: Every run appends to the file — it grows forever.
- **How**: Used `{flag: 'a'}` when you wanted to overwrite.
- **Fix**: Remove `{flag: 'a'}` to overwrite, or clear the file first.

### ❌ Callback Hell — deeply nested, unreadable code
- **What**: Multiple nested callbacks create a "pyramid of doom".
- **Fix**: Refactor to use `async/await` with `fs.promises` or wrap in a custom Promise.

---

## 🎤 Interview Questions & Answers

**Q1: What is the difference between `readFileSync` and `readFile`?**
> A: `readFileSync` is synchronous — it **blocks** the event loop until the file is read. `readFile` is asynchronous — it starts the read and calls a callback when done, never blocking. Use `readFile` in servers — `readFileSync` would freeze all other requests.

**Q2: Why should you avoid sync file methods in a Node.js server?**
> A: Sync methods **block the entire event loop** while running. In a server with thousands of concurrent users, one sync file operation can freeze all other requests — ruining performance.

**Q3: What does `{flag: 'a'}` do in `writeFile`?**
> A: It sets the file mode to **append**. New data is added to the end of the file instead of overwriting it. Without this flag, `writeFile` overwrites everything.

**Q4: What is "callback hell" and how do you fix it?**
> A: Callback hell is deeply nested callbacks that make code hard to read and maintain. Fix it by using:
> 1. Named functions instead of anonymous callbacks
> 2. Promises (`.then()/.catch()`)
> 3. `async/await` with `fs.promises`

**Q5: What happens if you call `readFile` on a file that doesn't exist?**
> A: The callback is called with an `err` object — the code inside `if(err)` runs. The process doesn't crash if you handle the error. With `readFileSync`, it throws an exception (must use try/catch).
