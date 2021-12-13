// import express library
const express = require('express');

// create app
const app = express();

const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);

// extract styles and scripts from subpages into the layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

const db = require('./config/mongoose'); // to see db is running or not
const user = require('./models/user');   // use to fetch database

// define port
const port = 8000;

// we have to tell where to look for static files
app.use(express.static('./assets'));







// use express router 
app.use('/', require('./routes/index'));

// use view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// listen the express (check if connected or not)
app.listen(port, function(err){
    if(err){
        console.log(`Error in server running : ${err}`);
        return;
    }
    console.log(`server running on port : ${port}`);
});