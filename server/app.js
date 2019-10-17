const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3005;

server.listen(port, () => {
   console.log(`Server has started on port ${port}`);
});

let numUsers = 0;
const gameRooms = {};

io.on('connection', socket => {
   let addedUser = false;
   console.info('New client connected');

    socket.on('add user', username => {
        console.info('add user');
        if(addedUser) return;

        socket.username = username;
        ++numUsers;
        addedUser = true;

        socket.emit('login', {
           numUsers,
        });

        socket.broadcast.emit('user joined', {
           username: socket.username,
           numUsers,
        });
    });

    socket.on('createRoom', (data, cb) => {

        if(!data.name && !data.room) {
            return cb('Данные некорректны');
        }

        if(numUsers === 2) {
            return cb('Комната уже полная');
        }

        ++numUsers;
        socket.join(data.room);
        cb({userId: socket.id});
        socket.broadcast.to(data.room).emit('userConnect', {m:`Зашёл второй игрк, игра скоро начнётся`});
    });

    socket.on('disconnect', () => {
        console.log("Client disconnected");

       if(addedUser) {
           --numUsers;

           socket.broadcast.emit('user left', {
              username: socket.username,
              numUsers,
           });
       }
    });
});
