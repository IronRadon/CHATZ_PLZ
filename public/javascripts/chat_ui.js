(function(root){
  var ChatApp = root.ChatApp = (root.ChatApp || {});

  var ChatUI = ChatApp.ChatUI = function(){
    this.socket = io.connect();
    this.addToDisplay();
  }

  ChatUI.prototype.sendMessage = function(message) {
    var chat = new ChatApp.Chat(this.socket);
    console.log(message);
    chat.sendMessage(message);
  }

  ChatUI.prototype.addToDisplay = function() {
    this.socket.on('message', function(data) {
      $('#messages').append('<br>'); //does not know chatServer
      $('#messages').append('<b>' + data.name + ': </b>');
      $('#messages').append(''+ data.message);
    })
  };

})(this);

$(function(){
  var chat = new ChatApp.ChatUI();

  $('#submit').click(function(event) {
    var message = $('#to-send').val();

    if(message.slice(0, 5) === "/nick") {
      chat.socket.emit("nicknameChangeRequest", message.slice(6))
    } else {
      chat.sendMessage(message);
      $('#to-send').val("");
    }
  });

  chat.socket.on("nicknameChangeResult")


})