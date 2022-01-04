const express = require('express');
const router = express.Router();
const path = require('path')

let pessoas = require('../dados/pessoas.js').pessoas
router.get("/",(req,res,next)=>{
    res.sendFile(path.normalize(path.join(__dirname,"../pages/index.html")))
})


function middleware(req,res,next){
    console.log("Middleware")
    
    console.log(req.query.admin)
    if(req.query.admin == "true"){
        req.admin = true
        next()
    }else{
        req.admin = false
        next()
    }
    
}
router.get("/middleware",middleware,(req,res,next)=>{
    res.send("Eu sou admin: "+req.admin)
})


router.get("/post",(req,res,next)=>{
    res.sendFile(path.join(__dirname+"../pages/post.html"))
})

router.post("/pessoas",(req,res,next)=>{
    let result = pessoas.slice();
    let have = false
    console.log("_________________________________")
    console.log(req.body)
    function checkName(obj) {
        return obj.name == req.body.name;
    }
    function checkEmail(obj) {
        return obj.email == req.body.email;
    }
    function checkId(obj) {
        return obj.id == req.body.id;
    }
    if(req.body.name !== ""){
       result =  result.filter(checkName)
       have = true
    }
    if(req.body.email !== ""){
        result =  result.filter(checkEmail)
        have = true 
    }
    if(req.body.id !== ""){
        console.log(req.body.id)
        result =  result.filter(checkId)
        have = true
    }
    if(result.length === 0 || !have){
        res.send(false)
    }else{
        res.send(result)
    }
})
router.get("/pessoas",(req,res,next)=>{
    let result = pessoas.slice();
    let have = false
    function checkName(obj) {
        return obj.name == req.query.name;
    }
    function checkEmail(obj) {
        return obj.email == req.query.email;
    }
    function checkId(obj) {
        return obj.id == req.query.id;
    }
    if(req.query.name !== ""){
       result =  result.filter(checkName)
       have = true
    }
    if(req.query.email !== ""){
        result =  result.filter(checkEmail)
        have = true 
    }
    if(req.query.id !== ""){
        console.log(req.query.id)
        result =  result.filter(checkId)
        have = true
    }
    if(result.length === 0 || !have){
        res.send(false)
    }else{
        res.send(result)
    }
})


module.exports = router;