const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

let tasks = [];

io.on('connection', (socket) => {
  socket.emit('loadTasks', tasks);

  socket.on('addTask', (task) => {
    tasks.push(task);
    io.emit('taskAdded', task);
  });

  socket.on('deleteTask', (taskId) => {
    tasks = tasks.filter(task => task.id !== taskId);
    io.emit('taskDeleted', taskId);
  });
});

server.listen(4000, () => {
  console.log('listening on *:4000');
});
