// started the operating system — this comment marks the beginning of the program

console.log('first');   // runs immediately — synchronous — goes straight to the call stack

setTimeout(() => {       // setTimeout schedules a callback to run LATER (async)
    console.log('second');  // this runs AFTER the call stack is empty — even with 0ms delay!
}, 0)                   // 0ms delay — you might think 'second' prints second, but it doesn't!
                         // Even at 0ms, setTimeout goes through the Event Loop's timer queue
                         // The event loop only picks it up AFTER all synchronous code finishes

console.log('third');   // runs immediately — synchronous — BEFORE the setTimeout callback
                         // Even though setTimeout says 0ms, 'third' still prints before 'second'

// Expected output order:
// 1. 'first'   ← synchronous
// 2. 'third'   ← synchronous
// 3. 'second'  ← async (event loop picks it up after sync code finishes)

// completed and exited operating system process — this comment marks the end of sync code
