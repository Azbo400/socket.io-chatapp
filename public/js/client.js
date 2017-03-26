
$(function () {
var socket = io();
$('form').submit(function(){
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});
socket.on('chat message', function(msg){
  msg = msg.replace(':\'(', ':sob:');
  msg = msg.replace(';)',':wink:');
  msg = msg.replace(':)', ':smile:');
  msg = msg.replace(':(', ':worried:');
  msg = msg.replace(':D', ':smile:');
  msg = msg.replace('xD', ':laughing:');
  // Commands
  if(/\/me/gm.test(msg)){
    // filter /me
    msg = msg.replace(/\/me/gm,'');
      $('#messages').append($('<li>').html(`<strong>username ${msg}</strong>`));
      console.log('WORRRRRRRRRKSL!');
  }else{
    console.log(msg);
    $('#messages').append($('<li>').html(emojione.shortnameToImage(msg)));
  }
});
socket.on('User connected',function(){
  $('#messages').append($('<li>').text(`Welcome username!!!`));
  socket.on('chat message',function(name){

  });
});
socket.on('User disconnected',function(){
  $('#messages').append($('<li>').text('Username disconnected'));
});
});
//Get CDN for sheet of emojies
wdtEmojiBundle.init('.textbox');
wdtEmojiBundle.defaults.emojiSheets.emojione = './sheet_emojione.png';
wdtEmojiBundle.defaults.type = 'emojione';