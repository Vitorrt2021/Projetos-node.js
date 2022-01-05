const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require("body-parser");


app.use(bodyParser.json());
let pessoas = require('./dados/pessoas.js').pessoas

app.get("/",(req,res,next)=>{
    res.sendFile(path.join(__dirname,"/pages/post.html"))
})

app.get("/pessoas/id/:id",(req,res,next)=>{
   const result = pessoas.filter((obj) =>{
      return obj.id == req.params.id  
   })
   res.send(result)
})

app.get("/pessoas/name/:name",(req,res,next)=>{
    const result = pessoas.filter((obj) =>{
        const a = obj.name.toUpperCase()
        return a.includes(req.params.name.toUpperCase());
    })
    res.send(result)
 })
app.get("/pessoas/email/:email",(req,res,next)=>{
    const result = pessoas.filter((obj) =>{
        const a = obj.email.toUpperCase()
        return a == req.params.email.toUpperCase();
    })
    res.send(result)
 })
app.post("/pessoas",(req,res,next)=>{
    res.send(pessoas)
})



const port = process.env.PORT || 3004
app.listen(port,()=>console.log(`Ouvindo na porta ${port} ...`))