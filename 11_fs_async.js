const { error } = require('console');
const{readFile,writeFile} = require('fs')
console.log('start');

readFile('./content/first.txt','utf8',(err,first) => {
    if(err){
        console.error(err)
        return;    
    }
    //console.log(result); 
    //const first = result;
    readFile('./content/second.txt','utf8',(err,second) => {
        if(err){
            console.error(err)
            return;
        }
        //console.log(result);
        writeFile('./content/result-async.txt',`\n here is the result: ${first}, ${second}`,{flag: 'a'},
            (err,result) =>{
            if(err){
                console.error(err)
                return;
            }
            //console.log("file written successfull !!")
            //const resultAsync = result;
            readFile('./content/result-async.txt','utf8',(err, result) => {
                if(err){
                    console.error(err);
                    return;
                }
                console.log('done with the task');
                //console.log(result)
            });
        });
    });

});
console.log('starting with the new one');
