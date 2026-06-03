// Modules
//CommonJS , every file is module (by default)
//modules - Encapsulated Code (only share minimum)
// const secret = 'SUPER SECRET'
// const john  = 'john'
// const peter = 'peter'

// const sayHi = (name) => {
//     console.log(`hello there ${name}`);
// }
const names = require('./04_names.js');
const sayHi = require('./05_utils.js');
const data  = require('./06_alternative-syntax.js');
require('./07_mind_grenade')

//console.log(rr);

// sayHi('dasmat')
// sayHi(names.john)
// sayHi(names.peter)