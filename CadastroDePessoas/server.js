const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require("body-parser");

app.use(express.static('pages'));

app.use(bodyParser.json());
let pessoas = require('./dados/pessoas.js').pessoas

app.get("/",(req,res,next)=>{
    res.sendFile(path.join(__dirname,"/pages/post.html"))
})

app.get("/pessoas",(req,res,next)=>{
    const type = req.query.type
    let result = [];
    switch (type) {
        case 'id':
            result = pessoas.filter((obj) =>{
                return obj.id == req.query.id  
            })  
            break;
        case 'name':
            result = pessoas.filter((obj) =>{
                const a = obj.name.toUpperCase()
                return a.includes(req.query.name.toUpperCase());
            })  
            break;
        case 'email':
            result = pessoas.filter((obj) =>{
                const a = obj.email.toUpperCase()
                return a.includes(req.query.email.toUpperCase());
            })  
            break;
    }
    res.send(result)
})

app.get("/pessoas",(req,res,next)=>{
    res.send(pessoas)
})
app.post('/pessoas',(req,res)=>{
    console.log(req.body)
    const pessoa = {
        "id": pessoas.length + 1,
        "name": req.body.name,
        "email":req.body.email
    }
    if(req.body.email.length >=3 && req.body.name.length>=3){
        pessoas.push(pessoa)
        res.send(pessoa);
    }else{
        res.status(400).send("O nome é o email devem ter ao menor 3 caracteres!")
    }
    
})
app.put('/pessoas/:id',(req,res) => {
   
    const pessoa = pessoas.find(c => c.id ===parseInt(req.params.id))
    if(!pessoa){
        return res.status(404).send("Não tem pessoa com esse ID")
    }
    if(req.body.name.length >=3) pessoa.name = req.body.name
    if(req.body.email.length >=3) pessoa.email = req.body.email;
    res.send(pessoa)
})


app.delete('/pessoas/:id',(req,res)=>{
    const pessoa = pessoas.find(c => c.id ===parseInt(req.params.id))
    if(!pessoa){
       return  res.status(404).send("Não tem pessoa com esse ID")
    }
    const index = pessoas.indexOf(pessoa)
    pessoas.splice(index,1);

    res.send(pessoa)
})

const port = process.env.PORT || 3004
app.listen(port,()=>console.log(`Ouvindo na porta ${port} ...`))