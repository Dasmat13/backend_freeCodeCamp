// npm - global command, comes with Node.js installation
// npm --version              → check which version of npm is installed

// local dependency - use it only in the particular project
// npm i <packageName>        → installs the package into THIS project's node_modules folder
//                              e.g. npm i lodash  → installs lodash locally

// global dependency - use it in ANY project (installed system-wide)
// npm install -g <packageName>          → installs globally (Linux/Windows)
// sudo npm install -g <packageName>    → same but needs admin rights on Mac

// package.json - manifest file (stores important info about project/package)
// It records: project name, version, dependencies, scripts, author, license, etc.

// manual approach (create package.json in the root, create properties etc)
// npm init      → walks you through setup step by step, press enter to skip any field
// npm init -y   → skips all questions and uses default values (fastest way to start)

const _ = require('lodash');  // loads the lodash library (must be installed first: npm i lodash)
                               // lodash is a utility library with many helpful array/object functions
                               // '_' is the conventional variable name for lodash

const items = [1, [2, [3, [4, [5]]]]]   // a deeply nested array — arrays inside arrays inside arrays
const newItems = _.flatMapDeep(items)    // _.flatMapDeep flattens ALL nesting levels and returns a flat array
                                          // Result: [1, 2, 3, 4, 5]

// new method — native JS alternative to lodash's flatMapDeep
console.log(items.flat(Infinity));  // Array.flat(Infinity) flattens ALL levels of nesting natively
                                     // Infinity means "flatten no matter how deep"
                                     // Output: [1, 2, 3, 4, 5]

console.log(newItems);            // prints the result of _.flatMapDeep — same as above: [1, 2, 3, 4, 5]
console.log('hello world');       // a plain string log — just a sanity check / separator
console.log(_.flattenDeep(items)); // _.flattenDeep is similar to flatMapDeep but simpler
                                    // It just flattens deeply without applying a mapping function
                                    // Output: [1, 2, 3, 4, 5]

const users = ['dasmat', 'john']   // a simple array of user name strings
const result = _.flatMapDeep(users, (name) => [  // for each user name, return an array of 2 values
    name,                // the name as-is:          e.g. 'dasmat'
    name.toUpperCase()   // the name in ALL CAPS:     e.g. 'DASMAT'
])
// flatMapDeep maps AND then flattens all results into one array
// Result: ['dasmat', 'DASMAT', 'john', 'JOHN']
console.log(result);   // prints: ['dasmat', 'DASMAT', 'john', 'JOHN']

const orders = ['laptop', 'keyboard', 'mouse', 'webcame', 'monitor']  // simple flat array of strings
                                                                         // NOTE: 'webcame' is a typo — should be 'webcam'

const products = _.flatMapDeep(orders);   // calling flatMapDeep on a flat array with NO mapping function
                                           // does nothing useful — it just returns the same flat array
                                           // This is a demonstration of behavior, not a real use case
console.log(products);  // prints: ['laptop', 'keyboard', 'mouse', 'webcame', 'monitor']
