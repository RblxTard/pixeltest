const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let gridState = Array(50 * 50).fill('#FFFFFF'); // Default grid state

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Send current grid state
  socket.emit('gridState', gridState);

  // Handle pixel change
  socket.on('pixelChange', ({ index, color }) => {
    gridState[index] = color;
    socket.broadcast.emit('pixelChange', { index, color });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start server
const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
