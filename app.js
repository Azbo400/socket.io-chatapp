var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var markdown = require( "markdown" ).markdown;

var port = process.env.PORT || 3000;

var onlineUsers = [];
var username;

app.use(express.static(__dirname + '/public'));

app.set('view engine','ejs');
app.use(bodyParser());

app.get('/', function(req, res){
  res.render('login');
});
//Need to find a way to get req.body.username too app.get /room

app.post('/',function(req,res){
  onlineUsers.push(req.body.username);
  username = req.body.username;
  res.redirect('/room');
});

app.get('/room',function(req,res){
  console.log(onlineUsers);
  res.render('index',onlineUsers);
});

io.on('connection', function(socket){
  console.log('a user connected');
  io.emit('User connected',`Welcome ${username}`);
  socket.on('disconnect', function(){
    console.log('user disconnected');
    io.emit('User disconnected');
  });
  socket.on('chat message', function(msg){
    io.emit('chat message',  `<strong>${username}</strong> ${markdown.toHTML(msg)}`);
  });
});



http.listen(port, function(){
  console.log(`Listening on port ${port}`);
});
