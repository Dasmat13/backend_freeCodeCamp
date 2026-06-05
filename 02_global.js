// ============================================================
// 02_global.js — Node.js Global Object
// ============================================================

// In Node.js, 'global' is the top-level object (like 'window' in browsers)
// Variables declared with 'var' at the top level get attached to 'global'
// Variables declared with 'let' or 'const' do NOT get attached to 'global'

// Printing the full global object (it's very large — shows all built-in globals)
// console.log(global);

// You can set your own properties on the global object (not recommended in real apps)
global.myName = 'Dasmat';                 // adds 'myName' to the global scope
console.log(global.myName);              // prints 'Dasmat' — accessible from anywhere

// Useful built-in globals in Node.js (no need to import them):
console.log(__dirname);                  // full path to the current directory
console.log(__filename);                 // full path including this file's name
console.log(typeof require);             // 'function' — used to import modules
console.log(typeof module);              // 'object'   — holds module info
console.log(typeof process);             // 'object'   — holds process/env info
