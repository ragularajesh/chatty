// server.js
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: { origin: "*" } // Allows connections from mobile devices
});
const path = require('path');

// Serve static frontend files
app.use(express.static(path.join(__dirname)));

io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);

    // Listen for incoming messages from a client
    socket.on('chat message', (msg) => {
        // Broadcast the message to EVERYONE connected
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start server on port 3000 (or the deployment platform's port)
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});