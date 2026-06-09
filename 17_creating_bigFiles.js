const {writeFileSync} = require('fs');
for(let x = 0 ; x < 10000; x++){
    writeFileSync('./content/big.txt',`hello world ${x}\n`,{flag: 'a'})
}