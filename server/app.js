const http = require('http');
const express = require('express');
const users = require('./users')();
const rooms = require('./rooms')();

const app = express();

let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
};
app.use(allowCrossDomain);

const server = http.createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3005;

server.listen(port, () => {
    console.log(`Server has started on port ${port}`);
});

function getWinner(users) {
    const PAPER = "paper";
    const SCISSORS = "scissors";
    const ROCK = "rock";


    const firstUser = users[0];
    const secondUser = users[1];

    const firstUserRate = firstUser.rate;
    const secondUserRate = secondUser.rate;

    if (firstUserRate === secondUserRate) {
        return {
            winnerId: 0,
            firstUserRate: firstUserRate,
            secondUserRate: secondUserRate,
        };
    }

    if (
        (firstUserRate === PAPER && secondUserRate === ROCK) ||
        (firstUserRate === SCISSORS && secondUserRate === PAPER) ||
        (firstUserRate === ROCK && secondUserRate === SCISSORS)
    ) {
        return {
            winnerId: firstUser.id,
            firstUserRate: firstUserRate,
            secondUserRate: secondUserRate
        };
    }

    return {
        winnerId: secondUser.id,
        firstUserRate: firstUserRate,
        secondUserRate: secondUserRate,
    };
}

// const rooms = ['123', 'my room'];


io.on('connection', socket => {
    console.info('New client connected');

    const userJoin = (data) => {
        const {userName, roomName} = data;

        socket.join(roomName);
        socket.room = roomName;

        rooms.createRoom(roomName);
        rooms.addPlayer(roomName, {id: socket.id, name: userName});
    };

    const startGame = data => {

        const room = rooms.getRoom(socket.room);
        let players = [];
        const playersInRoom = room.getPlayers();

        for (let player in playersInRoom) {
            if (playersInRoom.hasOwnProperty(player)) {
                players.push(playersInRoom[player]);
            }
        }

        io.to(socket.room).emit('getWinner', {
            ...getWinner(players),
        });
        room.clearRates();
    };

    const roomUpdate = (changes = {}) => {

        if (changes.rate) {
            const room = rooms.getRoom(socket.room);
            let haveAllRates = false;

            room.setRate(socket.id, changes.rate);

            const rates = room.getRates();

            if (rates.length === 2) {
                haveAllRates = true;
            }

            if (haveAllRates && room.getPlayersCount() === 2) {
                startGame();
            }
        }
    };

    const roomLeave = () => {
        const roomName = socket.room;
        io.to(roomName).emit('checkStatus', {canStart: false});
        socket.leave(roomName);

        const room = rooms.getRoom(roomName);

        if (room) {
            room.removePlayer(socket.id);
            room.isOpen = true;

            if (room.getPlayersCount() === 0) {
                rooms.removeRoom(roomName);
            }
        }
    };


    //TODO: подумать как обрабатывать ошибку, если человек вводит имя комнаты, которая уже создана
    socket.on('userJoin', (data, cb) => {
        const {roomName, userName} = data;
        const room = rooms.getRoom(roomName);

        if (!roomName || !userName) {
            cb({
                status: 'Error',
                error: 'Не корректные данные',
            });
            return;
        }

        if (room && !room.isOpen) {
            cb({
                status: "Error",
                error: "Комната уже полная"
            });
            return false;
        }

        userJoin(data);

        console.info(`New user join ${userName} in ${roomName}`);

        if(room && room.getPlayersCount() === 2) {
            room.isOpen = false;
            io.to(socket.room).emit('checkStatus', {canStart: true});
        }

        cb({status: "ok", socketId: socket.id});
    });

    socket.on('userLeave', (data, cb) => {
        console.log(`userLeave ${socket.id}`);
        roomLeave();
        cb({});
    });

    socket.on('userRate', (data, cb) => {
        const {rate} = data;

        if (!rate) {
            cb({status: "Error", error: "Нужно сделать ставку"});
            return false;
        }

        roomUpdate({rate});
        cb({status: "ok"});
    });


    socket.on('disconnect', () => {
        console.log("Client disconnected");

        roomLeave();
    });
});


/*******************API*************************/

/**
 *
 */
app.route('/api/rooms')
    .get((req, res) => {
        res.json({rooms: rooms.getOpenRooms()});
    });