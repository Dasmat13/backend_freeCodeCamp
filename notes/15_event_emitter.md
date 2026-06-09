# 📝 Notes: 15_event_emitter.js — EventEmitter

## 🔑 Key Concepts (Easy to Remember)

| Method | What it does |
|--------|-------------|
| `new EventEmitter()` | Creates a new event bus |
| `.on('event', cb)` | Registers a listener — runs `cb` every time `'event'` fires |
| `.emit('event', ...args)` | Fires the event — all registered listeners run in order |
| `.once('event', cb)` | Like `.on()` but only runs the callback **once**, then removes it |
| `.off('event', cb)` | Removes a specific listener |
| `.removeAllListeners('event')` | Removes ALL listeners for an event |

> 💡 **Memory Trick**: Think of EventEmitter like a radio station.  
> `.emit()` = **broadcasting** a signal.  
> `.on()` = **tuning in** to receive it.  
> Many listeners can tune in to the same broadcast.

---

## 📌 Must-Know Points

- Node.js's `http`, `fs` streams, `net`, and almost every core module **extends EventEmitter**.
- Multiple `.on()` listeners for the same event = **all run**, in the order they were registered.
- `.emit()` is **synchronous** — all listeners run immediately before `.emit()` returns.
- `0o7` in JavaScript is **octal notation** — `0o7` = `7` in decimal. (`0o` prefix = octal)
- The name `'damsat'` in the file is a typo — likely meant `'dasmat'`.

### Custom EventEmitter pattern:
```js
const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('greet', (name) => console.log(`Hello, ${name}!`));
emitter.emit('greet', 'Dasmat'); // → Hello, Dasmat!
```

### Extending EventEmitter (real-world pattern):
```js
class MyServer extends EventEmitter {
  start() {
    this.emit('ready', { port: 3000 });
  }
}
const s = new MyServer();
s.on('ready', ({ port }) => console.log(`Server on port ${port}`));
s.start(); // → Server on port 3000
```

---

## 🐛 Bugs / Errors — What, How, When

### ❌ Typo: `'damsat'` instead of `'dasmat'`
- **What**: The emitted name is misspelled.
- **How**: `customEmitter.emit('response', 'damsat', 0o7)` — characters transposed.
- **When**: Typo during development — doesn't crash, just prints wrong name.
- **Fix**: Change `'damsat'` → `'dasmat'`.

### ❌ `MaxListenersExceededWarning`
- **What**: Node.js warns when you add more than 10 listeners to one event.
- **How**: Happens in loops or if you accidentally re-register listeners.
- **When**: You call `.on()` more than 10 times on the same event name.
- **Fix**: Use `emitter.setMaxListeners(20)` to increase the limit, or use `.once()` for one-time listeners.

### ❌ Event name typo — listener never fires
- **What**: `.on('responce', cb)` will never fire if you `.emit('response', ...)`.
- **How**: Simple string typo in the event name.
- **When**: Common mistake — event names are just strings, no autocomplete.
- **Fix**: Use constants: `const EVENTS = { RESPONSE: 'response' }` and reuse them.

---

## 🎤 Interview Questions & Answers

**Q1: What is the EventEmitter in Node.js?**
> A: EventEmitter is a core Node.js class from the `events` module. It implements the Observer/Pub-Sub pattern — objects can emit named events, and other parts of the code can listen and react to them. Almost all Node.js core modules extend EventEmitter.

**Q2: What is the difference between `.on()` and `.once()`?**
> A: `.on()` registers a persistent listener — it runs every time the event fires. `.once()` registers a one-time listener — it runs once on the first emit, then automatically removes itself.

**Q3: Is `.emit()` synchronous or asynchronous?**
> A: Synchronous. When you call `.emit()`, all listeners run immediately and in order before the next line of code executes.

**Q4: How does the HTTP server relate to EventEmitter?**
> A: `http.Server` extends `EventEmitter`. When you do `http.createServer((req, res) => {...})`, that callback is registered as a listener for the built-in `'request'` event. You can also write it explicitly: `server.on('request', (req, res) => {...})` — both are identical.

**Q5: What happens if you emit an event with no listeners?**
> A: Nothing — it's silently ignored. Exception: the special `'error'` event — if emitted with no listener, Node.js throws an uncaught exception and crashes. Always add `emitter.on('error', cb)`.
