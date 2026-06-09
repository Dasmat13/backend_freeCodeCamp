setInterval(() => {          // setInterval schedules a callback to run REPEATEDLY at a set interval
    console.log('hello world');  // this prints 'hello world' every 2000ms (2 seconds) forever
}, 2000)                    // 2000 milliseconds = 2 seconds — the callback repeats every 2 seconds
                             // setInterval keeps the Node.js process alive and running indefinitely
                             // To stop it: use clearInterval(id) where id = the return value of setInterval

console.log('i will run first');  // NOTE: 'frist' is a typo — should be 'first'
                                    // This runs IMMEDIATELY — synchronous code always runs before async timers
                                    // Even though setInterval is written first, this line runs first!
                                    // Expected output:
                                    // 1. 'i will run frist'     ← synchronous, instant
                                    // 2. 'hello world'          ← after 2 seconds
                                    // 3. 'hello world'          ← after 4 seconds
                                    // 4. (continues forever...)
