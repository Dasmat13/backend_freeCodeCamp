const http = require('http');

const server = http.createServer((req, res)=>{
    if(req.url === '/'){
        return res.end('HOME PAGE')
    }
    if(req.url === './about'){
        //blocking code 
        for(let i = 0 ; i< 1000 ; i ++){
            for(let j = 0 ; j< 1000; j++){
                console.log(`${i} ${j}`);
            }
        }
        return res.end('ABOUT PAGE')
    }
    return res.end('ERROR PAGE')
})

server.listen(5000,()=>{
    console.log('server listing on port: 5000 !!!');
    
})