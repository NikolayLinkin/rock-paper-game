let roomId = 0;

class Room {
    constructor(name) {
        this.id = ++roomId;
        this.name = name;
        this.players = {};
        this.playersCount = 0;
        this.rates = [];
    }

    addPlayer({id, name}) {
        this.players[id] = {
            score: 0,
            name,
            rate: false,
            id,
        };
        this.playersCount++;
    }

    removePlayer(playerId) {
        delete this.players[playerId];
        --this.playersCount;
    }

    getPlayersCount() {
        return this.playersCount;
    }

    getPlayers() {
        return this.players;
    }

    setRate(playerId, rate) {
        this.players[playerId].rate = rate;
        this.rates.push(rate);
    }

    getRates() {
        return this.rates;
    }
}


class Rooms {
    constructor() {
        this.rooms = {};
    }

    /**
     * Добавить новую комнату
     * @param room {object}
     */
    createRoom(room) {
        if(room in this.rooms) {
            return false;
        }
        this.rooms[room] = new Room(room);
    }

    addPlayer(room, player) {
        this.rooms[room].addPlayer(player);
    }

    removeRoom(room) {
        if(room in this.rooms) {
            delete this.rooms[room];
            --roomId;
        }
    }

    getRooms() {
        const result = [];
        for (let room in this.rooms) {
            result.push(this.rooms[room]);
        }
        return result;
    }

    getRoom(name) {
        return this.rooms[name];
    }

    getScore(userName) {

    }

    removeRoom(roomName) {
        delete this.rooms[roomName];
    }
}


module.exports = function () {
    return new Rooms();
};