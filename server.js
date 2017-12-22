var express=require("express");
var mongojs=require("mongojs");
var bodyParser=require("body-parser");
var path=require('path');

//User Authentication
var session=require("express-session");
var expressValidator=require("express-validator");
var localStrategy=require("passport-local").Strategy;
var flash=require('connect-flash');
var passport=require('passport');



// configure routes
var index=require('./routes/index');
var todos=require('./routes/todos');
// var login=require('./routes/login');
// var register=require('./routes/register')

var app=express();

//set views folder and view engine


app.set('views', path.join(__dirname, 'client/src'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'client/dist')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/', index);
app.use('/api/v1/', todos);

// app.use('/users/login', login);
// app.use('/users/register', register);

//Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});


// Session middleware (standard)
//MemoryStore: default store
app.use(session({
  secret: 'secret',
  saveUninitialized:true,
  resave: true
}))

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//connect flash middleware
app.use(flash());
app.use(function(req, res, next){
res.locals.messages= require('express-messages')(req, res);
next();
});


// middleware
// loads on every route

// app.get('*', function(req, res, next){
// // create a global variable & set
// res.locals.user=req.user || null;
// next();
// })



app.listen(3000, function(){
    console.log("Server started at port 3000")
})

