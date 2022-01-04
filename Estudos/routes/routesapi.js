const express = require('express');
const router = express.Router();
const cursos = require('../dados/cursos.js').cursos
router.use(express.json())

router.get('/',(req,res,next) => {
    res.send('Api principal')
})

router.get('/courses',(req,res)=>{
    res.send(cursos)
})
router.get("/courses/:id",(req,res)=>{
    const curso = cursos.find( c => c.id === parseInt(req.params.id))
    if(!curso){
        res.status(404).send('Não tem curso com esse id')
    }else{
        res.send(curso)
    }
})

function validation(req,res,next){
    if(!req.body.name || req.body.name.length <3){
        res.status(400).send('Name deve ter pelo menor 3 caracteres')
    }else if(!req.body.creator || req.body.creator.length <3){
        res.status(400).send('Creator deve ter pelo menor 3 caracteres')
    }else{
        next()
    }
}

router.post('/courses',validation,(req,res)=>{
    const curso = {
        "id": cursos.length + 1,
        "name": req.body.name,
        "creator":req.body.creator
    }
   cursos.push(curso)
   console.log(cursos)
   res.send(curso); 
})

router.put('/courses/:id',validation,(req,res) => {
    const curso = cursos.find(c => c.id ===parseInt(req.params.id))
    if(!curso){
        return res.status(404).send("Não tem curso com esse ID")
    }
    curso.name = req.body.name;
    curso.creator = req.body.creator;
    console.log(cursos)
    res.send(curso)
    
})

router.delete('/courses/:id',(req,res)=>{
    const curso = cursos.find(c => c.id ===parseInt(req.params.id))
    if(!curso){
       return  res.status(404).send("Não tem curso com esse ID")
    }
    const index = cursos.indexOf(curso)
    cursos.splice(index,1);

    console.log(cursos)
    res.send(curso)
})

router.get('/courses/:id/:year/:month',(req,res)=>{
    res.send(`O seu id é ${req.params.id} o ano é ${req.params.year} e o mes ${req.params.month} `)
})

module.exports = router;