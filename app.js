
const express = require('express')

require('./utils/dbMongo.js');
const cowsay = require('cowsay2');
const owl = require('cowsay2/cows/owl');

//Routes
const landingsApiRouter = require('./routes/landingsApiRoutes')
const usersApiRouter = require('./routes/usersApiRoutes')
const neasApiRouter = require('./routes/neasApiRoutes')

//Middleware 404
const manage404 = require('./middlewares/error404')

const app = express()

const cors = require("cors");
const port = 3000


//Read body from request

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


//API
app.use('/api', landingsApiRouter)
app.use('/api', neasApiRouter)
app.use('/api', usersApiRouter)


//If routes fail, show error 404
app.use(manage404);

//Owl say you if server works
app.listen(port, () => {
    console.log(cowsay.say(`Server working on http://localhost:${port}`, { cow: owl }))
  });