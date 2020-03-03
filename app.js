//load http module
const http = require("http");
const hostname = "localhost";
const port = 4000;

//create nodejs http server that will listen to port 4000
const server = http.createServer((req,res)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    res.end('Node Http server');
});

server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
});