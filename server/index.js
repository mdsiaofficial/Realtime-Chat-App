// Import the Express library, which is a web application framework for Node.js
const express = require('express')

// Import the Socket.IO library, which enables real-time, bidirectional communication
const socketio = require('socket.io')

// Import the built-in HTTP module in Node.js to create an HTTP server
const http = require('http')

// Set the port number on which the server will listen. Use the environment variable PORT if available, otherwise default to 8000
const PORT = process.env.PORT || 8000

// utils
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

// Import a custom router module from a file named 'router.js' located in the same directory
const router = require('./router');

// Set up express server
// Create an instance of an Express application
const app = express()
const cors = require('cors');
const { error } = require('console');
app.use(cors())
// Create an HTTP server using the Express application
const server = http.createServer(app);

// Initialize a new instance of Socket.IO by passing the HTTP server
const io = socketio(server, {
  cors: {
    origin: "http://localhost:5173", // Allow requests from this origin
    methods: ["GET", "POST"], // Allow these HTTP methods
    allowedHeaders: ["my-custom-header"], // Allow these headers
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log(`We have a new connection!!!`)


  socket.on('join', ({ name, room }, callback) => {
    console.log(name, room);

    const { error, user } = addUser({ id: socket.id, name, room });
    
    if (error) return callback(error);
    socket.emit('message', { user: "admin", text: `${user.name}, welcome to the room - ${user.room}` });
    socket.broadcast.to(user.room).emit("message", { user: "admin", text: `${user.name} has joined...` })
    socket.join(user.room);

    callback();
    // const error = true;
    // if (error) {
    //   callback({ error: "error"})
    // }
  });

  socket.on('sendMessage', (message, callback) => {
    // console.log('Message was sent');
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });
    
    callback();
  })
  socket.on('disconnect', () => {
    console.log('User had left!!!');
  })
})

// Use the custom router for handling HTTP requests
app.use(router);

// Start the HTTP server and listen for incoming connections on the specified port
// Log a message to the console indicating the URL where the server can be accessed
server.listen(PORT, () => console.log(`Server Started on http://localhost:${PORT}`));