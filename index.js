/***********************************************
 * 18652: Software Engineering 
 *
 * Miguel Sotolongo (msotolon)
 * January 15, 2015
 ***********************************************/

// Basic Webchat server loaded on port 3500.

var express = require('express');
var moment  = require('moment');
var app 	= express();
var http	= require('http').Server(app);
var io		= require('socket.io')(http);

var port 	= 3500;

// Serve /public directory
app.use(express.static(__dirname + '/public'));

http.listen(port);
console.log("Server started on port " + port);

// Handle Connection events
io.on('connection', function(socket) {
	console.log("User has connected.");
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
  	var time = moment();
    var format = time.format('HH:mmA ');
    socket.broadcast.emit('chat message', format + msg);
    socket.emit('chat stamp', format + msg);
  });
});

io.emit('some event', { for: 'everyone' });