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

//TODO: проверить
function getWinner(players) {
    const PAPER = "paper";
    const SCISSORS = "scissors";
    const ROCK = "rock";


    const firstPlayer = players[0];
    const secondPlayer = players[1];


    const firstRate = firstPlayer.rate;
    const secondRate = secondPlayer.rate;

    const result = {
        rates: {
            [firstPlayer.id]: firstRate,
            [secondPlayer.id]: secondRate,
        },
    };

    if (firstRate === secondRate) {
        result.draw = true;
    }

    if (
        (firstRate === PAPER && secondRate === ROCK) ||
        (firstRate === SCISSORS && secondRate === PAPER) ||
        (firstRate === ROCK && secondRate === SCISSORS)
    ) {
        result.winnerId = firstPlayer.id
    }

    if(
        (secondRate === PAPER && firstRate === ROCK) ||
        (secondRate === SCISSORS && firstRate === PAPER) ||
        (secondRate === ROCK && firstRate === SCISSORS)
    ) {
        result.winnerId = secondPlayer.id;
    }



    return result;
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

        io.to(socket.room).emit('getWinner', getWinner(players));
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

        if(room) {
            const players = room.getPlayersArray();
            if (players.find(player => player.name === userName)) {
                cb({
                    status: "Error",
                    error: "Игрок с таким именем уже находится в комнате",
                });
                return false;
            }

            if(!room.isOpen) {
                cb({
                    status: "Error",
                    error: "Комната уже полная"
                });
                return false;
            }
        }

        userJoin(data);

        console.info(`New user join ${userName} in ${roomName}`);

        if (room && room.getPlayersCount() === 2) {
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