var http = require('http');
var path = require('path');
var mime = require('mime');

var router = require('./router.js');
var chatServer = require('./lib/chat_server.js');

var server = http.createServer(function(request, response) {
  router.router(request,response);
});

var io = chatServer.createChat(server);

io.on('connection', function(socket) {
  console.log('connection from ', socket.id);

  socket.on('message', function(data) {
    io.sockets.emit('message', data);
  })
})




server.listen(8080);
console.log("server started")