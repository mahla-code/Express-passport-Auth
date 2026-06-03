const express = require('express');
const expresslayputs = require('express-ejs-layouts');
const { default: mongoose } = require('mongoose');
const Allroutes=require('./routes/index')
const flash=require('express-flash');
const seesion=require('express-session');
const { errorHandler, notFoundError } = require('./error.handling');
const passport = require('passport');
const { passportInit } = require('./passport.config');
const app=express();
mongoose.connect("mongodb://localhost:27017/passport-ejs").then(()=>{
 console.log('connected to db');
}).catch((err)=>{
    console.log(err);
})
//set up application
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(flash())
//setup layout
app.use(expresslayputs);
app.set('view engine','ejs')
app.set('layout','./layout/main.ejs')
//set up session
app.use(seesion({
    secret:'secret-key',
    resave:false,
    saveUninitialized:false
}))
//set up passport
passportInit(passport)
app.use(passport.initialize());
app.use(passport.session());

//Routers
app.use(Allroutes(passport))
app.use(errorHandler);
app.use(notFoundError)
const PORT=process.env.PORT ||3000
// set up express server
app.listen(PORT,()=>{
    console.log(`server run at http://localhost:${PORT}`);
    
})