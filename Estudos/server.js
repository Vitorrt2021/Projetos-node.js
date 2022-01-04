const express = require('express')
const app = express()
const bodyParser = require("body-parser");

let routesapi = require('./routes/routesapi.js')
let routes = require('./routes/routes.js')

app.use(bodyParser.json());
app.use('/middleware',routes)
app.use('/post',routes)
app.use('/pessoas',routes)
app.use('/api',routesapi)
app.use('/',routes)

const port = process.env.PORT || 3004
app.listen(port,()=>console.log(`Ouvindo na porta ${port} ...`))