// GLOBALS - NO WINDOW !!!
// In the browser, the global object is 'window'. In Node.js, there is NO 'window'.
// Instead, Node.js provides its own set of global variables that you can use anywhere.

// __dirname  - gives you the FULL path to the folder where the current file lives
// __filename - gives you the FULL path including the file's name itself
// require    - a built-in function used to import/load other modules (CommonJS style)
// module     - an object that holds information about the current file/module
// process    - an object with info about the current running process (OS, env variables, etc.)

console.log(__dirname);   // prints the absolute path of the current directory
setInterval(() => {        // setInterval runs a function repeatedly at a set time interval
    console.log('hello world');  // prints 'hello world' to the terminal every 1000ms
}, 1000)                   // 1000ms = 1 second — this will run forever until you stop the process

// console.log(__filename);  // would print the full path including this file's name
// console.log(require);     // would print the require function object
// console.log(module);      // would print info about this module (id, exports, parent, etc.)
// console.log(process);     // would print the process object (env, argv, versions, etc.)
