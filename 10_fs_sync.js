const { log } = require('console');
const {readFileSync, writeFileSync} = require('fs');
console.log('start');
const first = readFileSync('./content/first.txt','utf8');
const second = readFileSync('./content/second.txt','utf8');

writeFileSync('./content/result-sync.txt',`\nhere is the result: ${first}, ${second}`,/** flag: 'a' means append mode. New content is added at the end of the file and the existing content is preserved. */ {flag: 'a'} )
//console.log(first,second);

const result = readFileSync('./content/result-sync.txt','utf8');
//console.log(result);
console.log('done with the task');
console.log('starting with the new one');


