var express = require('express');
var app = express.createServer();
var io = require('socket.io').listen(app);

app.listen(4444);

io.sockets.on('connection', function (socket) {

  console.log('New connection');
  socket.emit('registered', 4000);

  handle_new_user(socket);
});

function handle_new_user(socket) {
  //wait 5 sec then send down a cell update
  setTimeout(function() {
    var cell = {cells: [{color: 'red', label: 'This is a test'}]};
    socket.emit('cell_update', cell, function(data){
      console.log('client got the cell_update: ' + data);
    });
  }, 5000);

}




