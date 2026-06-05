# 📝 Notes: app.js — Promises & async/await

## 🔑 Key Concepts (Easy to Remember)

| Concept | What it is |
|---------|-----------|
| **Promise** | An object representing a **future value** (pending → resolved/rejected) |
| `resolve(value)` | Call when operation **succeeds** → `.then()` receives the value |
| `reject(error)` | Call when operation **fails** → `.catch()` receives the error |
| `async` function | A function that **always returns a Promise** |
| `await` | **Pauses** the async function until the Promise resolves |
| `.then()` | Runs if Promise **resolves** (success) |
| `.catch()` | Runs if Promise **rejects** (failure) |

> 💡 **Memory Trick**: A Promise is a "pinky promise" from the OS — "I'll give you the file content... when I'm done reading it." `await` patiently waits for that promise.

---

## 📌 Must-Know Points

### The 3 States of a Promise
1. **Pending** — operation in progress, neither resolved nor rejected yet.
2. **Fulfilled/Resolved** — operation succeeded, value is available.
3. **Rejected** — operation failed, error is available.

### Wrapping Callbacks in Promises (the `getText` pattern)
```js
const getText = (path) => {
  return new Promise((resolve, reject) => {
    readFile(path, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};
```
This pattern lets you use `.then/.catch` or `await` on any callback function.

### async/await is syntactic sugar over Promises
```js
// Promise chain style
getText('./file.txt')
  .then(data => console.log(data))
  .catch(err => console.log(err));

// async/await style (same thing, cleaner)
const start = async () => {
  const data = await getText('./file.txt');
  console.log(data);
};
start();
```

### Always handle errors in async functions
```js
// ❌ No error handling — crash if file missing
const data = await getText('./missing.txt');

// ✅ With try/catch
try {
  const data = await getText('./missing.txt');
} catch (err) {
  console.error(err);
}
```

---

## 🐛 Bugs / Errors — What, How, When

### ❌ Bug: `const { result } = require('lodash')` — unused, wrong import
- **What**: `result` is not a standard top-level export from lodash in this way.
- **When**: Copy-paste leftover from another file.
- **Fix**: Remove this line — it's not needed in `app.js`.

### ❌ Unhandled Promise rejection
- **What**: An `await` throws but there's no `try/catch` or `.catch()`.
- **How**: `const data = await getText('./missing.txt')` — if file doesn't exist, app crashes.
- **When**: Every time a file doesn't exist or a network call fails.
- **Fix**: Wrap in `try/catch`:
  ```js
  try { const data = await getText('./file.txt'); }
  catch (err) { console.error(err); }
  ```

### ❌ Forgot to call `start()`
- **What**: The async function is defined but never called — nothing runs.
- **Fix**: Always call async functions: `start()` at the bottom.

---

## 🎤 Interview Questions & Answers

**Q1: What is a Promise in JavaScript?**
> A: A Promise is an object representing the eventual result of an asynchronous operation. It has 3 states: pending, fulfilled, and rejected. You handle results with `.then()` and errors with `.catch()`.

**Q2: What does `async/await` do?**
> A: `async` marks a function as asynchronous (it always returns a Promise). `await` pauses execution inside that function until the awaited Promise resolves — making async code look and read like synchronous code.

**Q3: How do you convert a callback-based function to use Promises?**
> A: Wrap it in `new Promise((resolve, reject) => { ... })` — call `resolve(data)` on success and `reject(err)` on failure. Or use `util.promisify(fn)` from Node's built-in `util` module.

**Q4: What happens if you use `await` outside an `async` function?**
> A: It throws a `SyntaxError: await is only valid in async functions`. You must always use `await` inside a function marked with `async`.

**Q5: What is the difference between `.then().catch()` and `async/await` with `try/catch`?**
> A: They do the same thing — both handle resolved and rejected Promises. `async/await` + `try/catch` looks more like synchronous code and is generally easier to read and debug. Use `async/await` for most cases; use `.then()/.catch()` for simple one-liners.
