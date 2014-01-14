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
  chatServer.guestNumber++;
  chatServer.nicknames[socket.id] = "guest" + chatServer.guestNumber;

  socket.on('message', function(data) {
    io.sockets.emit('message',
    {name: chatServer.nicknames[socket.id],
      message: data});
  });

// remember to check for 'guestXXX' pattern
  socket.on('nicknameChangeRequest', function(data) {
    if (validNickname) {
      chatServer.nicknames[socket.id] = data;
      socket.emit('nicknameChangeResult', {
        success: true,
        message: data
      });
    } else {
      socket.emit('nicknameChangeResult', {
        success: false,
        message: 'Nickname not valid'
      });
    }
  });

});

var validNickname = function(nickname) {
  var keys = Object.keys(chatServer.nicknames);

  keys.forEach(function (key) {
    if(chatServer.nicknames[key] === data) {
      return false;
    }
  })
  return true;
};




server.listen(8080);
console.log("server started")