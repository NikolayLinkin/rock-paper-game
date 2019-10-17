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
let gameRooms = [
    {id: 1, name: 'first room'},
    {id: 2, name: 'second room'},
    {id: 3, name: 'more room'},
];

io.on('connection', socket => {
    let addedUser = false;
    console.info('New client connected');

    socket.on('add user', username => {
        console.info('add user');
        if (addedUser) return;

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

    socket.emit('getAllRooms', gameRooms);

    socket.on('createRoom', (data, cb) => {
        if(addedUser) {
            return cb({error: 'Уже в комнате'});
        }
        if (!data.name && !data.room) {
            return cb({error: 'Данные некорректны'});
        }

        addedUser = true;

        // if (numUsers === 2) {
        //     return cb({error: 'Комната уже полная'});
        // }

        // if (!gameRooms.filter(room => room.name === data.name).length) {
        //     gameRooms.push({id: gameRooms.length, name: data.room});
        // }
        gameRooms.push({id: gameRooms.length, name: data.room});

        socket.emit('getAllRooms', gameRooms);

        ++numUsers;
        socket.join(data.room);
        cb({userId: socket.id});
        socket.broadcast.to(data.room).emit('userConnect', {m: `Зашёл второй игрк, игра скоро начнётся`});
    });

    socket.on('roomLeave', (data, cb) => {
       socket.leave(data.room);
       addedUser = false;
       console.info('User leave' + socket.id);
    });

    socket.on('disconnect', () => {
        console.log("Client disconnected");

        if (addedUser) {
            --numUsers;

            socket.broadcast.emit('user left', {
                username: socket.username,
                numUsers,
            });
        }
    });
});
