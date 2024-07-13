// Import the Express library, which is a web application framework for Node.js
const express = require('express')

// Import the Socket.IO library, which enables real-time, bidirectional communication
const socketio = require('socket.io')

// Import the built-in HTTP module in Node.js to create an HTTP server
const http = require('http')

// Set the port number on which the server will listen. Use the environment variable PORT if available, otherwise default to 8000
const PORT = process.env.PORT || 8000

// Import a custom router module from a file named 'router.js' located in the same directory
const router = require('./router');

// Set up express server
// Create an instance of an Express application
const app = express()

// Create an HTTP server using the Express application
const server = http.createServer(app);

// Initialize a new instance of Socket.IO by passing the HTTP server
const io = socketio(server);

// Use the custom router for handling HTTP requests
app.use(router);

// Start the HTTP server and listen for incoming connections on the specified port
// Log a message to the console indicating the URL where the server can be accessed
server.listen(PORT, () => console.log(`Server Started on http://localhost:${PORT}`));