const { log } = require('console')
const http = require('http')
const routes = require('./routes')

routes.fun2()
const server = http.createServer(routes.handler)

server.listen(3000,(err)=>{
if(err){
    
    console.log("error bro")
}else{
    console.log("Successfully created server");
    
}
})