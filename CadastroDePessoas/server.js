const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require("body-parser");


app.use(bodyParser.json());
let pessoas = require('./dados/pessoas.js').pessoas

app.get("/",(req,res,next)=>{
    res.sendFile(path.join(__dirname,"/pages/post.html"))
})



app.post("/pessoas",(req,res,next)=>{
    let have = false
    let result = pessoas.slice();

    function checkName(obj) {
        const a = obj.name.toUpperCase()
        return a.includes(req.body.name.toUpperCase());
    }
    function checkEmail(obj) {
        return obj.email.toUpperCase() == req.body.email.toUpperCase();
    }
    function checkId(obj) {
        return obj.id == req.body.id;
    }
    function validation(data){
        if(data.length >= 3 && data != "") return true
    }
    
    if(validation(req.body.name)){
       result =  result.filter(checkName)
       have = true
    }
    if(validation(req.body.email)){
        result =  result.filter(checkEmail)
        have = true 
    }
    if(req.body.id !== ""){
        result =  result.filter(checkId)
        have = true
    }
    if(result.length === 0 || !have){
        res.send(false)
    }else{
        res.send(result)
    }
})



const port = process.env.PORT || 3004
app.listen(port,()=>console.log(`Ouvindo na porta ${port} ...`))