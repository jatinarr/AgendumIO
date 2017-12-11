var express=require("express");
var mongojs=require("mongojs");
var bodyParser=require("body-parser");
var path=require('path');

// configure routes
var index=require('./routes/index');
var todos=require('./routes/todos')

var app=express();

//set views folder and view engine


app.set('views', path.join(__dirname, 'client/src'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'client/dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/', index);
app.use('/api/v1/', todos);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

app.listen(3000, function(){
    console.log("Server started at port 3000")
})

