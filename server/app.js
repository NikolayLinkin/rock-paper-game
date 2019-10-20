const http = require('http');
const express = require('express');
const users = require('./users')();
const rooms = require('./rooms')();

const app = express();

let allowCrossDomain = function(req, res, next) {
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

        for(let player in playersInRoom) {
            if(playersInRoom.hasOwnProperty(player)) {
                players.push(playersInRoom[player]);
            }
        }

        io.to(socket.room).emit('getWinner', {
            ...getWinner(players),
        });
    };

    const roomUpdate = (changes={}) =>{

        if(changes.rate) {
            const room = rooms.getRoom(socket.room);
            let haveAllRates = false;

            room.setRate(socket.id, changes.rate);

            const rates = room.getRates();

            if(rates.length === 2) {
                haveAllRates = true;
            }

            if(haveAllRates && room.getPlayersCount() === 2) {
                startGame();
            }
        }
    };


    socket.on('userJoin', (data, cb) => {
        const {roomName, userName} = data;
        const room = rooms.getRoom(roomName);

        if(!roomName || !userName) {
            cb({
                status: 'Error',
                error: 'Не корректные данные',
            });
            return;
        }

        if (room && room.getPlayersCount() === 2) {
            cb({
                status: "Error",
                error: "Комната уже полная"
            });
            return false;
        }

        userJoin(data);
        cb({status: "ok"});
    });

    socket.on('userLeave', (data, cb) => {
       const {roomName} = data;
       socket.leave(roomName);
       const room = rooms.getRoom(roomName);

       if(room) {
           room.removePlayer(socket.id);
       }
       if(room.getPlayersCount() === 0) {
           rooms.removeRoom(roomName);
       }
    });

    socket.on('userRate', (data, cb) => {
        const {rate} = data;

        if(!rate) {
            cb({status: "Error", error: "Нужно сделать ставку"});
            return false;
        }

        roomUpdate({rate});
    });


    socket.on('disconnect', () => {
        console.log("Client disconnected");
    });
});

app.route('/api/rooms')
    .get((req, res) => {
    console.log(rooms.getRooms());
    res.json(rooms.getRooms());
});