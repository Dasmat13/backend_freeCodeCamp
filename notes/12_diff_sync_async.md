# 📝 Notes: 12_diff_btw_sync_and_async — Sync vs Async Side-by-Side

## 🔑 Key Concepts (Easy to Remember)

```
SYNC  →  Does Task 1 → Does Task 2 → Does Task 3 → Done
ASYNC →  Starts Task 1 → Moves to "next task" → Task 1 finishes → callback runs
```

> 💡 **Memory Trick**: Sync = Standing in queue at a bank. Async = Take a token, sit down, get called when ready.

---

## 📌 Must-Know Points

### Execution Order Comparison

| Step | Synchronous | Asynchronous |
|------|------------|--------------|
| 1 | `console.log('SYNC: start')` | `console.log('ASYNC: start')` |
| 2 | `readFileSync(first)` → **WAITS** | `readFile(first)` → MOVES ON |
| 3 | `readFileSync(second)` → **WAITS** | `console.log('ASYNC: starting with the new one')` |
| 4 | `writeFileSync(...)` → **WAITS** | *(file read completes in background)* |
| 5 | `readFileSync(result)` → **WAITS** | `readFile(second)` callback fires |
| 6 | `console.log('SYNC: done')` | `writeFile` callback fires |
| 7 | `console.log('SYNC: starting with the new one')` | `console.log('ASYNC: done')` |

### Expected Output Order
```
ASYNC: start
ASYNC: starting with the new one    ← runs before file is read!
SYNC: start
SYNC: done with the task
(file content)
SYNC: starting with the new one
ASYNC: done with the task           ← arrives last, even though it started first
(async file content)
```
This proves async operations don't block the call stack.

### `{flag: 'a'}` — Append Mode
- Both versions use `{flag: 'a'}` → they ADD to the result files each time you run.
- Run the file 3 times → the result file has 3 repeated entries.
- Remove `{flag: 'a'}` if you want to overwrite on each run.

---

## 🐛 Bugs / Errors — What, How, When

### ❌ File grows unboundedly in append mode
- **What**: Every time you run the script, it appends new content to the result file.
- **How**: `{flag: 'a'}` is set on both sync and async write operations.
- **When**: You run the file multiple times during development.
- **Fix**: Delete result files between runs, or remove `{flag: 'a'}` if you always want a fresh write.

### ❌ Both async and sync share the same result files
- **What**: The async section writes to `result-async.txt`, the sync section writes to `result-sync.txt` — this is correct.
- **Risk**: If you accidentally point both to the same file in append mode, you'll get garbled content.

---

## 🎤 Interview Questions & Answers

**Q1: In Node.js, what is the difference between synchronous and asynchronous code?**
> A: Synchronous code blocks execution — each line waits for the previous to finish. Asynchronous code doesn't block — operations start, and a callback/promise handles the result when ready. This is what makes Node.js fast for I/O-heavy tasks.

**Q2: Why does `console.log('starting with the new one')` print BEFORE `console.log('done with the task')` in async code?**
> A: Because `readFile` is non-blocking. Node.js registers the callback and immediately moves to the next synchronous line. The callback only runs AFTER the current call stack is empty (via the event loop). So the final `console.log` runs synchronously before the file read is even done.

**Q3: Will synchronous file operations freeze a Node.js server?**
> A: Yes. `readFileSync` blocks the entire event loop. While waiting for the file, the server can't handle any other incoming requests. For servers, always use async methods.

**Q4: When is it acceptable to use synchronous file operations?**
> A: During app startup / initialization — e.g., reading a config file before the server starts. Since it happens once before the server is ready, blocking is acceptable. Never use sync methods inside request handlers.
