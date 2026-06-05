const { log } = require('console');
const {readFile, writeFile} = require('fs');
const { result } = require('lodash');

console.log('started as first task');
readFile('../content/first.txt','utf8', (err, result)=>{
    if(err){
        console.log(er);
        return;
    }
    console.log(result);
    console.log('completed first task');
})
console.log('starting next task');
