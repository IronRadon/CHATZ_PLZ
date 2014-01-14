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
      $('#messages').append('<br>');
      $('#messages').append(data);
    })
  };

})(this);

$(function(){
  var chat = new ChatApp.ChatUI();

  $('#submit').click(function(event) {
    chat.sendMessage($('#to-send').val());
    $('#to-send').val("");
  });
})