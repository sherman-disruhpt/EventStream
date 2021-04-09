const express = require('express');
const config = require('./storage/config.json');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const Storage = require('./storage');

const app = express();

app.use(express.static(path.join(path.join(__dirname, '/../public'))));

app.get('/result', (req, res) => res.json({expected: config.expected_result}));

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', socket => {
  socket.on('disconnect', reason => console.log(`Socket ${socket.id} disconnected (reason: ${reason}).`));
  socket.on('error', error => console.error(`Error for Socket ${socket.id}`, error));

  const storage = new Storage(socket);

  socket.on('pause', () => storage.pause());
  socket.on('resume', () => storage.stream());
});

server.listen(config.port, () => console.log(`Server listening on port ${config.port}.`));
