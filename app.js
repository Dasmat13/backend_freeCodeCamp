const {readFile} = require('fs');
const { result } = require('lodash');

const getText = (path) => {
    return new Promise ( (resolve,reject)=>{
        readFile(path,'utf8',(err,data)=>{
    if(err){
        reject(err)
    }
    else{
        resolve(data);
    }
})
    })
}

// getText('./content/first.txt')
// .then((result) => console.log(result))
// .catch((err) => console.log(err))

const start = async() => {
    const first = await getText('./content/first.txt')
    console.log(first);
    
}

start()