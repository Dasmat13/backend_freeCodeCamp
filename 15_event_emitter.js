const EventEmitter = require('events');
// loads Node.js built-in 'events' module
// EventEmitter is a class — the core of Node.js's event-driven architecture
// Almost everything in Node.js (http server, streams, fs) is built on EventEmitter internally

const customEmitter = new EventEmitter()
// creates a NEW instance of EventEmitter
// 'customEmitter' is our own event bus — we can emit and listen to any event names we define

// on   - listen for an event (register a listener/handler)
// emit - emit an event (fire/trigger the event so all listeners run)

customEmitter.on('response', (name, id) => {
    // .on() registers a listener for the 'response' event
    // Every time 'response' is emitted, this callback runs
    // 'name' and 'id' are the arguments passed when the event is emitted
    console.log(`data received user ${name} with id ${id}`);
    // prints: "data received user damsat with id 7"
    // NOTE: 0o7 is OCTAL notation in JavaScript → equals 7 in decimal
})

customEmitter.on('response', () => {
    // you can register MULTIPLE listeners for the same event
    // both will run when 'response' is emitted — in the order they were registered
    // this second listener takes no arguments (ignores the emitted values)
    console.log(`some other logic here`);
    // prints: "some other logic here"
})

customEmitter.emit('response', 'damsat', 0o7)
// .emit() fires the 'response' event
// passes 'damsat' as the first argument → received as 'name' in the first listener
// passes 0o7 (octal 7 = decimal 7) as the second argument → received as 'id'
// Both listeners above run sequentially when this line executes
// NOTE: 'damsat' appears to be a typo — likely meant 'dasmat'