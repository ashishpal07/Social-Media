// import express library
const express = require('express');

// create app
const app = express();

// define port
const port = 8000;





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