let roomId = 0;

class Room {
    constructor(name) {
        this.id = ++roomId;
        this.name = name;
        this.players = {};
        this.playersCount = 0;
        this.isOpen = true;
    }

    addPlayer({id, name}) {
        this.players[id] = {
            name,
            rate: false,
            id,
            ready: true,
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

    getPlayersArray() {
        const result = [];

        for(let player in this.players) {
            if(this.players.hasOwnProperty(player)) {
                result.push(this.players[player]);
            }
        }

        return result;
    }

    setRate(playerId, rate) {
        this.players[playerId].rate = rate;
    }

    setReady(playerId) {
        this.players[playerId].ready = true;
    }

    getRates() {
        const rates = [];
        for(let player in this.players) {
            const rate = this.players[player].rate;

            if(rate) {
                rates.push(this.players[player].rate);
            }
        }
        return rates;
    }

    clearRates() {
        for(let player in this.players) {
            this.players[player].rate = "";
            this.players[player].ready = false;
        }
    }

    allPlayersReady() {
        for(let player in this.players) {
            if(this.players[player].ready === false) {
                return false;
            }
        }

        return true;
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

    getOpenRooms() {
        const result = [];
        for (let room in this.rooms) {
            if(this.rooms[room].isOpen) {
                result.push(this.rooms[room]);
            }
        }
        return result;
    }

    getRoom(name) {
        return this.rooms[name];
    }

    getScore(userName) {

    }
}


module.exports = function () {
    return new Rooms();
};