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
// const user = require('./models/user');   // use to fetch database

// use for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');

const passporGoogle = require('./config/passport-google-oauth2-stretagy');


// define port
const port = 8000;

// we have to tell where to look for static files
app.use(express.static('./assets'));

// make the uploads path available to the browser
app.use('/users/profile/uploads', express.static(__dirname + '/uploads'));


// for cookie
const cookieParser = require('cookie-parser');

const MongoStore = require('connect-mongo');

const flash = require('connect-flash');

const customWare = require('./config/middleware');

// const sassMiddleware = require('node-sass-middleware');

// app.use(sassMiddleware({
//     src: './assets/scss',
//     dest: './assets/css',
//     debug: true,
//     outputStyle: 'extended', 
//     prefix: '/css',
// }));


// socket.io setup chat server 
const cors = require('cors');
app.use(cors())
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');

// reding from post reqest
app.use(express.urlencoded());

// to use cookie parser
app.use(cookieParser());


// use view engine
app.set('view engine', 'ejs');
app.set('views', './views');



app.use(session({
    name: 'codeial',
    // to do change the secret before deployment in production node
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100),
    },
    store:MongoStore.create({
        
        mongoUrl: 'mongodb://localhost:27017/codeial_devlopment',
        autoRemove:'disabled',
    },function(err){
        console.log(err || 'connect-mongdb setup');
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customWare.setFlash);

// use express router 
app.use('/', require('./routes/index'));

// listen the express (check if connected or not)
app.listen(port, function(err){
    if(err){
        console.log(`Error in server running : ${err}`);
        return;
    }
    console.log(`server running on port : ${port}`);
});