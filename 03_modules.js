// Modules
// In Node.js, every FILE is its own module automatically (CommonJS system).
// This means variables and functions in one file are NOT accessible in another file by default.
// You have to EXPLICITLY export what you want to share, and IMPORT what you want to use.

// CommonJS — every file is a module (by default)
// modules — Encapsulated Code (only share minimum)

// These lines are commented out — they show that local variables stay private:
// const secret = 'SUPER SECRET'   // this would be private — not shared with other files
// const john  = 'john'            // also private if not exported
// const peter = 'peter'           // also private if not exported

// These are also commented out — showing what the old approach might look like:
// const sayHi = (name) => {
//     console.log(`hello there ${name}`);
// }

const names = require('./04_names.js');              // loads the exports from 04_names.js (john, peter)
const sayHi = require('./05_utils.js');              // loads the sayHi function from 05_utils.js
const data  = require('./06_alternative-syntax.js'); // loads items and singlePerson from 06_alternative-syntax.js
require('./07_mind_grenade')                         // runs 07_mind_grenade.js — note: no variable needed if you just want to execute it

//console.log(rr);  // this would throw ReferenceError: rr is not defined — it's a typo/leftover

// sayHi('dasmat')       // would call sayHi with the string 'dasmat' → prints "hello there dasmat"
// sayHi(names.john)     // would call sayHi with 'john' → prints "hello there john"
// sayHi(names.peter)    // would call sayHi with 'peter' → prints "hello there peter"