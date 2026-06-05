// This file demonstrates the "mind grenade" concept in Node.js:
// Every file in Node.js is wrapped inside a function automatically.
// That wrapper function is called the "Module Wrapper Function".
// It looks like: (function(exports, require, module, __filename, __dirname) { ... })
// This is WHY __dirname, __filename, require, module, and exports are available in every file!
// They are not truly "global" — they are PARAMETERS injected by Node.js into each file.

const num1 = 5;   // declares a constant 'num1' with value 5 — scoped to this module
const num2 = 10;  // declares a constant 'num2' with value 10 — scoped to this module

// Declares a named function 'addValues'
function addValues() {
    // Uses both num1 and num2 from the outer scope (closure)
    // Template literal builds the string: "the sum is 15"
    console.log(`the sum is ${num1 + num2}`);
}

addValues()  // calls the function — this runs immediately when this file is require()'d
             // Output: "the sum is 15"
             // This proves Node.js executes the file top-to-bottom when it's loaded