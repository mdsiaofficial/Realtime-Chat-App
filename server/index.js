const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const PORT = 8000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.get('/', (req, res) => {
  res.send('Hello from the server!');
})
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});