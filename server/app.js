const http = require('http');
const express = require('express');
const users = require('./users')();

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

const PAPER = "paper";
const SCISSORS = "scissors";
const ROCK = "rock";

function getWinner(users) {
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

let rates = [];

io.on('connection', socket => {
    let addedUser = false;
    console.info('New client connected');

    socket.on('userJoin', (data, cb) => {
        if (addedUser) return;

        if (numUsers === 2) {
            cb({error: 'Комната уже заполнена'});
        }
        if(!data.userName) {
            cb({error: 'данные не корректны'});
        }

        console.info('new user join' + data.userName);

        users.remove(socket.id);
        users.add({
            id: socket.id,
            name: data.userName,
        });

        cb({id: socket.id});

        ++numUsers;
        addedUser = true;

        if (numUsers === 2) {
            cb({message: 'Игра начнётся через 15 сек'})
        }

        if (numUsers < 2) {
            cb({message: 'Ожидание другого игрока'})
        }
    });

    socket.on('findWinner', (data, cb) => {
        const {socketId, rate} = data;

        const user = users.get(socketId);
        user.rate = rate;
        rates.push(user);
        cb({});

        if(rates.length === 2) {
            const {winnerId, firstUserRate, secondUserRate} = getWinner(rates);
            io.emit('winner', {winnerId, firstUserRate, secondUserRate});
            rates = [];
            return;
        }
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
