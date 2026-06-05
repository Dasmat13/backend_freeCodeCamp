# 📝 Notes: 08_os_modules.js — The `os` Module

## 🔑 Key Concepts (Easy to Remember)

| Method | Returns |
|--------|---------|
| `os.userInfo()` | Object with: `username`, `uid`, `gid`, `shell`, `homedir` |
| `os.uptime()` | Seconds since last system boot |
| `os.type()` | OS name: `'Linux'`, `'Darwin'` (Mac), `'Windows_NT'` |
| `os.release()` | OS version string (e.g. `'5.15.0'`) |
| `os.totalmem()` | Total RAM in **bytes** |
| `os.freemem()` | Available free RAM in **bytes** |

> 💡 **Memory Trick**: `os` = "OS Stats". Use it to read machine info — user, memory, uptime, OS type.

---

## 📌 Must-Know Points

- `os` is a **built-in module** — no `npm install` needed, just `require('os')`.
- Memory is returned in **bytes**. Convert: divide by `1024³` (or `1e9`) to get GB.
  ```js
  const gb = os.totalmem() / (1024 * 1024 * 1024); // bytes → GB
  ```
- `os.type()` returns `'Linux'`, `'Darwin'` (Mac), or `'Windows_NT'` — not "macOS" or "Windows 11".
- Useful for: logging system info, writing cross-platform scripts, monitoring apps.

---

## 🐛 Bugs / Errors — What, How, When

### ❌ Memory looks like a huge number
- **What**: `os.totalmem()` returns `8589934592` (bytes), not `8` (GB).
- **When**: You forget to convert units.
- **Fix**: `(os.totalmem() / 1e9).toFixed(2) + ' GB'`

### ❌ `os.type()` returns unexpected value
- **What**: You expected `'Windows'` but got `'Windows_NT'`.
- **Fix**: Use `os.platform()` for shorter strings: `'win32'`, `'linux'`, `'darwin'`.

---

## 🎤 Interview Questions & Answers

**Q1: Why would you use the `os` module in a Node.js app?**
> A: To read system information — useful for monitoring, DevOps tools, CLI utilities, logging platform info, and writing OS-aware scripts (e.g., using different paths on Windows vs Linux).

**Q2: How do you convert bytes to gigabytes in Node.js?**
> A: `const gb = os.totalmem() / (1024 ** 3)` — divide by 1024 three times (bytes → KB → MB → GB).

**Q3: What does `os.uptime()` return?**
> A: The number of seconds the system has been running since the last reboot. Divide by 3600 to get hours.

**Q4: Is `os` a third-party or built-in module?**
> A: Built-in. It ships with Node.js — no installation needed. Other built-ins: `fs`, `path`, `http`, `events`, `crypto`.
