const socket = io();
socket.on('chat message', (msg) => {
  console.log(msg);
});
