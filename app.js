
const express = require('express')

require('./utils/dbmongo.js');
const cowsay = require('cowsay2');
const owl = require('cowsay2/cows/owl');
const path = require('path')

//Routes
const landingsApiRouter = require('./routes/landingsApiRoutes')
const usersApiRouter = require('./routes/usersApiRoutes')
const neasApiRouter = require('./routes/neasApiRoutes')

//Middleware 404
const manage404 = require('./middlewares/error404')

const app = express()



const cors = require("cors");
app.use(cors());

const port = process.env.PORT || 3000
app.use(express.static('public'));

//Read body from request


app.use(express.json())
app.use(express.urlencoded({ extended: true }));


//API
app.use('/api', landingsApiRouter)
app.use('/api', neasApiRouter)
app.use('/api', usersApiRouter)


// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
// require('dotenv').config({path: path.resolve(process.cwd(), 'client', '.env.development'), debug: true});

//If routes fail, show error 404
app.use(manage404);

//Owl say you if server works
app.listen(port, () => {
    console.log(cowsay.say(`Server working on http://localhost:${port}`, { cow: owl }))
  });