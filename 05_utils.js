// Define an arrow function called 'sayHi' that takes one parameter: 'name'
const sayHi = (name) => {
    console.log(`hello there ${name}`);  // prints a greeting using a template literal
                                          // e.g. if name = 'Dasmat', prints: "hello there Dasmat"
}

// export default — exporting a single value directly (not wrapped in an object)
// This means when another file does require('./05_utils'), they get the function directly
module.exports = sayHi  // exports the sayHi function so other files can use it