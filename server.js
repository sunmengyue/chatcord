const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  // Welcome current user
  socket.emit('chat message', 'Welcome to chatcord');

  // Broadcast when a user connects
  socket.broadcast.emit('chat message', 'A new user joined the chat');

  //disconnect when a user leaves
  socket.on('disconnect', () => {
    io.emit('chat message', 'A user left the chat');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
