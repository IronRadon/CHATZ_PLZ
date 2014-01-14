var socketIO = require('socket.io');

var createChat = function(server) {
  return socketIO.listen(server);
};

module.exports.createChat = createChat;
module.exports.socketIO = socketIO;

