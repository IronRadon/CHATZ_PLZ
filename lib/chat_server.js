var socketIO = require('socket.io');
var guestNumber = 1;
var nicknames = {};


var createChat = function(server) {
  return socketIO.listen(server);
};

module.exports.createChat = createChat;
module.exports.socketIO = socketIO;
module.exports.guestNumber = guestNumber;
module.exports.nicknames = nicknames;