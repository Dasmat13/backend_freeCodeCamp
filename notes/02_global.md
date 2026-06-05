# 📝 Notes: 02_global.js — The Node.js Global Object

## 🔑 Key Concepts (Easy to Remember)

| Context | Top-Level Object | Available Globals |
|---------|-----------------|-------------------|
| Browser | `window` | `document`, `alert`, `fetch`, `window.location` |
| Node.js | `global` | `__dirname`, `__filename`, `require`, `module`, `process` |

> 💡 **Memory Trick**: `global` in Node.js = `window` in browsers. But don't use it directly — Node.js encourages explicit imports.

---

## 📌 Must-Know Points

- `global.myName = 'Dasmat'` attaches a variable to the global scope — accessible from any file.
- Variables declared with **`var`** at the top level get attached to `global`.
- Variables declared with **`let` or `const`** do **NOT** get attached to `global`.
- In real applications, **avoid polluting the global object** — use `module.exports` to share data instead.
- Logging `global` prints a massive object — don't do it unless debugging.

---

## 🐛 Bugs / Errors — What, How, When

### ❌ Accidentally creating a global variable
- **What**: You accidentally created a globally accessible variable.
- **How**: `myVar = 'test'` (missing `const`/`let`/`var`) — in non-strict mode, this becomes `global.myVar`.
- **When**: Easy to do in quick scripts. Causes hard-to-track bugs in bigger apps.
- **Fix**: Always use `const` or `let`. Enable `'use strict'` at the top of files.

### ❌ `TypeError: window is not defined`
- **What**: You used `window` in a Node.js script.
- **Fix**: Replace `window` with `global` or restructure your code to not rely on it.

---

## 🎤 Interview Questions & Answers

**Q1: What is the global object in Node.js?**
> A: It's called `global`. It's equivalent to `window` in the browser. It contains built-in globals like `setTimeout`, `console`, `Buffer`, `process`, etc.

**Q2: Is a `var` declared at the top level of a Node.js file added to `global`?**
> A: No! In Node.js, each file is wrapped in a Module Wrapper Function. So `var x = 5` is scoped to that function, not to `global`. Only `global.x = 5` explicitly adds it to global.

**Q3: Should you use the `global` object to share data between files in Node.js?**
> A: No — it's bad practice. Use `module.exports` and `require()` to share data explicitly and safely between files.

**Q4: What's the difference between `global` and `process`?**
> A: `global` is the top-level namespace object (like `window`). `process` is a specific global object that gives you info about the running Node process — env vars, arguments, exit codes, etc.
