
const fs=require('fs')
const reqHandler = (req,res)=>{

    if(req.url === '/'){
        fs.readFile('formValues.txt','utf-8',(err,data)=>{

            res.write('<html><body>'); // First chunk of data
  res.write(`<h1>${data}</h1>`); // Second chunk
  

res.write(`<form action="/message" method="POST">
            <label for="name"> Enter Name</label>
            <input type="text" name="username" id="name"/>
            <button type="submit">Add</button>
            </form>`)
  res.end('</body></html>'); // End the response with the final chunk

      
      
        })
       
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
}

const display = ()=>{
    console.log("Hiii")
}
// module.exports = reqHandler; // common way to export

// module.exports = {
// reqHandler,
// display
// }                    2nd way to export


// module.exports = {
// handler:reqHandler,
// fun2:display
// }                    exporting functions with assigned names for accessing

module.exports.handler = reqHandler;
module.exports.fun2 = display;
