# 📝 Notes: 03–07 — CommonJS Module System

## 🔑 Key Concepts (Easy to Remember)

| Concept | What it means |
|---------|---------------|
| Every file is a module | Each `.js` file has its **own private scope** |
| `require('./file')` | **Imports** exports from another file |
| `module.exports = value` | **Exports** a single value (function, object, etc.) |
| `module.exports = { a, b }` | **Exports multiple** things as an object |
| `module.exports.key = value` | **Exports one thing at a time** (alternative syntax) |

> 💡 **Memory Trick**: Think of each file as a "black box". You control exactly what goes in (`require`) and what comes out (`module.exports`).

---

## 📌 Must-Know Points

### `03_modules.js` — The Main Entry Point
- `require()` runs the required file immediately from top to bottom.
- The result of `require()` is whatever that file exported via `module.exports`.
- If a file exports nothing, `require()` returns an empty object `{}`.

### `04_names.js` — Private vs Shared Variables
- `secret` is declared but NOT exported → it stays private to `04_names.js`.
- `john` and `peter` ARE exported → accessible from any file that requires `04_names.js`.
- This is **encapsulation** — hide what you don't need to share.

### `05_utils.js` — Exporting a Function
- `module.exports = sayHi` exports the function **directly** (not inside an object).
- When you do `const sayHi = require('./05_utils')`, you get the function itself.
- You call it directly: `sayHi('Dasmat')`.

### `06_alternative-syntax.js` — Inline Exports
- Instead of one big `module.exports = {...}` at the bottom, you export one item at a time.
- Both styles work — pick one and stay consistent.

### `07_mind_grenade.js` — The Module Wrapper Function
- Every Node.js file is wrapped in this before it runs:
```js
(function(exports, require, module, __filename, __dirname) {
  // YOUR CODE HERE
})
```
- This is WHY `__dirname`, `__filename`, `require`, `module`, and `exports` exist in every file!
- They are NOT true globals — they're **parameters injected by Node.js**.

---

## 🐛 Bugs / Errors — What, How, When

### ❌ `ReferenceError: X is not defined` when requiring
- **What**: You required a file and tried to use a variable that wasn't exported.
- **How**: `const { secret } = require('./04_names')` — `secret` is not exported.
- **When**: You forgot to add something to `module.exports`.
- **Fix**: Export everything you need to share.

### ❌ `Error: Cannot find module './filename'`
- **What**: The `require()` path is wrong.
- **How**: Typo in path, wrong folder, or wrong extension.
- **When**: Happens during development constantly.
- **Fix**: Double check the path. Use `path.join(__dirname, 'filename')` for safety.

### ❌ Circular Dependencies
- **What**: File A requires File B, and File B requires File A.
- **How**: Node.js handles it but returns an **incomplete** export (empty `{}`).
- **When**: Poor project structure.
- **Fix**: Redesign your module structure to avoid circular references.

---

## 🎤 Interview Questions & Answers

**Q1: What is CommonJS?**
> A: CommonJS is the module system used by Node.js by default. Every file is its own module, and you use `require()` to import and `module.exports` to export.

**Q2: What is the difference between `module.exports` and `exports`?**
> A: `exports` is a shortcut reference to `module.exports`. You can do `exports.name = 'John'` OR `module.exports.name = 'John'` — both work. BUT if you reassign `exports = { ... }` directly, it breaks the reference. Always use `module.exports = { ... }` for safety.

**Q3: What happens when you `require()` the same file multiple times?**
> A: Node.js **caches** it. The file runs only once on the first require. After that, Node returns the cached export. This is important for performance.

**Q4: What is the difference between CommonJS (`require`) and ES Modules (`import`)?**
> A: CommonJS is synchronous and uses `require`/`module.exports`. ES Modules are asynchronous and use `import`/`export`. Node.js supports both — use `.mjs` extension or `"type": "module"` in `package.json` for ES Modules.

**Q5: How does `module.exports` work if you have private variables?**
> A: Variables not added to `module.exports` stay private to the file. Only what's explicitly exported is accessible from outside — this is JavaScript's module **encapsulation**.
