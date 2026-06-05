// npm - global command, comes with code 
// npm --version
// local dependency - use it only in the particular projects
// npm i <packageName>

// global dependency - use it in any project
// npm install -g <packageName>
// sudo npm install -g <packageName> (mac)

// package.json - manifest file (stores important info about project/package)
//manual approch (create package.json in the root , create properties etc)
// npm init (step by step, press enter to skip)
// npm init -y (everything default)

const _ = require('lodash');

const items = [1,[2,[3,[4,[5]]]]]
const newItems = _.flatMapDeep(items)
//new method 
console.log(items.flat(Infinity));

console.log(newItems);
console.log('hello world');
console.log(_.flattenDeep(items));



const users = ['dasmat', 'john']
const result = _.flatMapDeep(users, (name) => [
    name,
    name.toUpperCase()
])
console.log(result);

const orders = ['laptop','keyboard','mouse','webcame','monitor']

const products = _.flatMapDeep(orders);
console.log(products);
