# 📝 Notes: 01_intro.js — Node.js Globals

## 🔑 Key Concepts (Easy to Remember)

| Global | What it gives you |
|--------|-------------------|
| `__dirname` | Full path to the current **folder** |
| `__filename` | Full path to the current **file** (including file name) |
| `require` | Function to **import** other modules |
| `module` | Info about the **current module** (its exports, id, etc.) |
| `process` | Info about the **running Node process** (env vars, args, OS) |

> 💡 **Memory Trick**: Node.js has NO `window`. Its globals are: `__dirname`, `__filename`, `require`, `module`, `process`.

---

## 📌 Must-Know Points

- In the **browser**, the global object is `window`.
- In **Node.js**, there is **no `window`** — instead you have the Node globals above.
- All 5 globals are available **without importing anything**.
- They are NOT truly global — they're injected by Node's **Module Wrapper Function** (see `07_mind_grenade` notes).
- `setInterval` keeps the process alive; it runs **until you kill it** with `Ctrl+C`.

---

## 🐛 Bugs / Errors — What, How, When

### ❌ `ReferenceError: window is not defined`
- **What**: You tried to use `window` in a Node.js file.
- **How**: `console.log(window.location)` — works in browser, crashes in Node.
- **When**: Happens when you paste browser JS code into Node.js.
- **Fix**: Use `global` instead of `window` in Node.js.

### ❌ Infinite loop from `setInterval`
- **What**: `setInterval` runs forever — the process never exits on its own.
- **How**: Called `setInterval` without keeping the timer ID to cancel it.
- **When**: Always — it's by design. Stop it with `clearInterval(id)`.
- **Fix**: `const id = setInterval(...); clearInterval(id)` when you want to stop.

---

## 🎤 Interview Questions & Answers

**Q1: What is `__dirname` in Node.js?**
> A: `__dirname` is a Node.js global that holds the absolute path of the **directory** containing the current file. It's injected by the Module Wrapper Function, not the OS.

**Q2: What is the difference between `__dirname` and `__filename`?**
> A: `__dirname` is the folder path. `__filename` is the full path **including the file name itself**.

**Q3: Does Node.js have a `window` object?**
> A: No. Node.js has no DOM and no `window`. Use `global` as the top-level object, but best practice is to not rely on it — use explicit imports.

**Q4: What is `process` in Node.js?**
> A: `process` is a global object that provides info about and control over the current Node.js process — environment variables (`process.env`), command-line args (`process.argv`), exit the process (`process.exit()`), etc.

**Q5: What is the difference between `setInterval` and `setTimeout`?**
> A: `setTimeout` runs the callback **once** after a delay. `setInterval` runs the callback **repeatedly** at a fixed time interval. Both are part of the event loop's timer phase.
