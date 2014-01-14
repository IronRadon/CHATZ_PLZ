(function(root) {
  var ChatApp = root.ChatApp = (root.ChatApp || {});

  var Chat = ChatApp.Chat = function(socket) {
    this.SocketIO = socket;
  };

  Chat.prototype.sendMessage = function(data){
    this.SocketIO.emit('message', data);
  }
})(this);