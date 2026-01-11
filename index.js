const { log } = require('console')
const http = require('http')
const fs=require('fs')
const server = http.createServer((req,res)=>{

    if(req.url === '/'){
        res.setHeader('Content-Type','text/html')
        res.end(`<form action="/message" method="POST">
            <label for="name"> Enter Name</label>
            <input type="text" name="username" id="name"/>
            <button type="submit">Add</button>
            </form>`)
    }else{
        if (req.url==='/message') {
            res.setHeader('Content-Type','text/html')
            let dataa = []
            req.on('data',(chunks)=>{
                console.log(chunks)
                dataa.push(chunks)
            })

            req.on('end',()=>{
                let combinedBuffer = Buffer.concat(dataa)
                console.log(combinedBuffer.toString())
                let value = combinedBuffer.toString().split('=')[1]
                console.log(value);

                fs.writeFile('formValues.txt',value,(err)=>{
                    res.statusCode = 302
                    res.setHeader('Location','/')
                    res.end()
                })
                
            })
        }else{
            if(req.url=='/read'){
                fs.readFile('formValues.txt','utf-8',(err,data)=>{
                    // console.log(data.toString())
                    // res.setHeader('Content-Type','text/html')
                    res.end(`<h1>${data.toString()}</h1>`)
                })
            }
        }
    }
})

server.listen(3000,(err)=>{
if(err){
    
    console.log("error bro")
}else{
    console.log("Successfully created server");
    
}
})