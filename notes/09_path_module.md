# 📝 Notes: 09_path_module.js — The `path` Module

## 🔑 Key Concepts (Easy to Remember)

| Method | What it does | Example output |
|--------|-------------|----------------|
| `path.sep` | The OS path separator | `/` on Linux, `\` on Windows |
| `path.join(...)` | Joins path segments safely | `'/content/subfolder/test.txt'` |
| `path.basename(p)` | Extracts just the file name | `'test.txt'` |
| `path.resolve(...)` | Creates an absolute path | `'/home/dasmat/content/text.txt'` |
| `path.dirname(p)` | Gets the directory part of a path | `'/content/subfolder'` |
| `path.extname(p)` | Gets the file extension | `'.txt'` |

> 💡 **Memory Trick**: Use `path.join()` to build paths safely across all OS types. Never manually concatenate paths with `+` or `/`.

---

## 📌 Must-Know Points

- `path` is a **built-in module** — no install needed.
- Always use `path.join()` instead of string concatenation for cross-platform compatibility:
  ```js
  // ❌ Wrong — breaks on Windows
  const p = __dirname + '/content/file.txt'

  // ✅ Right — works on all platforms
  const p = path.join(__dirname, 'content', 'file.txt')
  ```
- `path.resolve()` vs `path.join()`:
  - `path.join()` just joins segments — result might be relative.
  - `path.resolve()` always returns an **absolute** path (starts from `/` on Linux).
- `path.basename()` accepts an optional second argument to strip the extension:
  ```js
  path.basename('/content/test.txt', '.txt') // → 'test'
  ```

---

## 🐛 Bugs / Errors — What, How, When

### ❌ Wrong path on Windows
- **What**: Paths break when code runs on Windows because Windows uses `\` instead of `/`.
- **When**: You hardcode slashes: `/content/file.txt` works on Linux, fails on Windows.
- **Fix**: Always use `path.join()` — it uses the right separator for the current OS automatically.

### ❌ `path.resolve()` gives unexpected absolute path
- **What**: You expected a relative result but got an absolute one.
- **How**: `path.resolve('content', 'file.txt')` doesn't use `__dirname` — it resolves from the **current working directory** (where you ran `node`).
- **Fix**: Always pass `__dirname` as the first argument: `path.resolve(__dirname, 'content', 'file.txt')`.

---

## 🎤 Interview Questions & Answers

**Q1: Why use `path.join()` instead of string concatenation for file paths?**
> A: Because `path.join()` handles OS differences automatically — it uses `\` on Windows and `/` on Linux/Mac. String concatenation hardcodes one style and breaks cross-platform.

**Q2: What is the difference between `path.join()` and `path.resolve()`?**
> A: `path.join()` just merges path segments. `path.resolve()` always produces an **absolute** path. If you pass absolute segments to `path.resolve()`, it resets from that point.

**Q3: What does `__dirname` contain?**
> A: The absolute directory path of the currently executing file. It's injected by Node's Module Wrapper Function — not a true global.

**Q4: How do you get just the file extension from a path?**
> A: `path.extname('/content/file.txt')` returns `'.txt'`.

**Q5: How do you get just the file name without the directory?**
> A: `path.basename('/content/subfolder/test.txt')` returns `'test.txt'`.
