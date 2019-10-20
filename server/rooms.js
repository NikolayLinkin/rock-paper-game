class Room {
    constructor() {
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
        this.rooms[room] = new Room();
    }

    addPlayer(room, player) {
        this.rooms[room].addPlayer(player);
    }

    removeRoom(room) {
        if(room in this.rooms) {
            delete this.rooms[room];
        }
    }

    getRooms() {
        return this.rooms;
    }

    getRoom(id) {
        return this.rooms[id];
    }

    getScore(userName) {

    }

    remove() {

    }
}


module.exports = function () {
    return new Rooms();
};