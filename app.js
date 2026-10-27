const express = require('express');
require('dotenv').config()
const expressLayouts = require('express-ejs-layouts');
const { default: mongoose } = require('mongoose');
const Allroutes=require('./routes/index')
const flash=require('express-flash');
const session=require('express-session');
const { errorHandler, notFoundError } = require('./error.handling');
const passport = require('passport');
const { passportInit } = require('./passport.config');
const app=express();
mongoose.connect(process.env.DB_URL).then(()=>{
 console.log('connected to db');
}).catch((err)=>{
    console.log(err);
})
//set up application
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(flash())
//setup layout
app.use(expressLayouts);
app.set('view engine','ejs')
app.set('layout','./layout/main.ejs')
//set up session
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))
//set up passport
passportInit(passport)
app.use(passport.initialize());
app.use(passport.session());

//Routers
app.use(Allroutes(passport))
app.use(notFoundError)
app.use(errorHandler);
const PORT=process.env.PORT ||3000
// set up express server
app.listen(PORT,()=>{
    console.log(`server run at http://localhost:${PORT}`);
    
})