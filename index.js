// import express library
const express = require('express');

// create app
const app = express();

// define port
const port = 8000;

// listen the express (check if connected or not)
app.listen(port, function(err){
    if(err){
        console.log(`Error in server running : ${err}`);
        return;
    }
    console.log(`server running on port : ${port}`);
});