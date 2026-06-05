# 📝 Notes: 14_npm_basic.js — NPM & Lodash

## 🔑 Key Concepts (Easy to Remember)

| Command | What it does |
|---------|-------------|
| `npm --version` | Check npm version |
| `npm init -y` | Create `package.json` with defaults (fastest) |
| `npm i <pkg>` | Install a package locally (into `node_modules`) |
| `npm i -g <pkg>` | Install a package globally (available everywhere) |
| `npm i` | Install ALL dependencies from `package.json` |
| `npm uninstall <pkg>` | Remove a package |

> 💡 **Memory Trick**: `npm i` = install. `-g` = global. `package.json` = your project's ID card.

---

## 📌 Must-Know Points

### `package.json`
- The **manifest file** for your project.
- Records: project name, version, description, scripts, dependencies, author, license.
- **`dependencies`** — packages needed to RUN the app in production.
- **`devDependencies`** — packages needed only during development (testing, bundlers).
  ```bash
  npm i <pkg>          # adds to "dependencies"
  npm i <pkg> --save-dev  # adds to "devDependencies"
  ```

### Lodash (`_`)
- A utility library with helpful functions for arrays, objects, strings.
- `_.flatMapDeep(arr)` — flattens all nesting levels AND maps a transformation.
- `_.flattenDeep(arr)` — just flattens all levels (no mapping).
- `arr.flat(Infinity)` — native JS equivalent (no lodash needed for basic flattening since ES2019).

| Method | What it does |
|--------|-------------|
| `_.flatMapDeep(arr, fn)` | Maps each element with `fn`, then flattens ALL levels |
| `_.flattenDeep(arr)` | Flattens deeply nested array to a flat array |
| `arr.flat(Infinity)` | Native JS — same as flattenDeep, no library needed |

---

## 🐛 Bugs / Errors — What, How, When

### ❌ `Error: Cannot find module 'lodash'`
- **What**: You required lodash but it's not installed.
- **Fix**: Run `npm install lodash` in your project root.

### ❌ `node_modules` not committed to git
- **What**: You cloned a repo but node_modules is missing.
- **Why**: `.gitignore` excludes `node_modules` (correct behavior — it can be 100MB+).
- **Fix**: Run `npm install` — it reinstalls everything from `package.json`.

### ❌ Typo in `orders` array: `'webcame'` instead of `'webcam'`
- **What**: Minor typo in the data, doesn't cause a crash but is incorrect.
- **Fix**: Change `'webcame'` → `'webcam'`.

### ❌ Using `_.flatMapDeep` on a flat array with no function
- **What**: `_.flatMapDeep(['a', 'b'])` with no mapping function just returns the same array.
- **When**: Misunderstanding of what flatMapDeep is for.
- **Fix**: Only use `flatMapDeep` when you need to BOTH map AND flatten. Use `flattenDeep` for just flattening.

---

## 🎤 Interview Questions & Answers

**Q1: What is `package.json` and why is it important?**
> A: It's the manifest file for a Node.js project. It stores the project name, version, scripts, and all dependencies with their exact versions. Running `npm install` uses `package.json` to recreate `node_modules`.

**Q2: What is the difference between `dependencies` and `devDependencies`?**
> A: `dependencies` are packages needed to run the app in production (e.g., express, lodash). `devDependencies` are only needed during development (e.g., nodemon, jest, eslint). When deploying, you can skip devDependencies with `npm install --production`.

**Q3: What does `npm install` do when there is no `node_modules` folder?**
> A: It reads `package.json`, downloads all listed packages from the npm registry, and creates the `node_modules` folder.

**Q4: Should `node_modules` be committed to git?**
> A: No. It should be in `.gitignore`. It can be very large and can always be regenerated with `npm install`.

**Q5: What is lodash and why might you use it over native JS methods?**
> A: Lodash is a utility library with many helper functions. For older codebases, it provides cross-browser/version-compatible utilities. In modern JS, many lodash functions are now available natively (e.g., `Array.flat()`, `Array.flatMap()`), so you may not need lodash for simple tasks.
