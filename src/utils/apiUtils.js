import socketIOClient from "socket.io-client";

/**
 * emit события
 * @param event {string}
 * @param data {object}
 * @returns {Promise<>}
 */
const emitApi = (event, data) => {
      return new Promise((resolve, reject) => {
         if(!socket) {
             reject('No socket connection');
         }

         socket.emit(event, data, (res) => {
             if(res.error) {
                 reject(res.error);
             }

             resolve(res);
         })
      });
};

/**
 * подписка на событие
 * @param event {string}
 * @returns {Promise<>}
 */
const onApi = event => {
    return new Promise((resolve, reject) => {
        if(!socket) {
            reject('No socket connection');
        }

        socket.on(event, res => {
            if(res.error) {
                reject(res.error);
            }

            resolve(res);
        })
    });
};

let socket = null;

//TODO: не длжно работать в PVE


const endpoint = "http://localhost:3005";

export const connect = () => {
    socket = socketIOClient(endpoint);

    subscribes(socket);
};

export const subscribes = (socket) => {
    return {
        getWinner() {return onApi('winner')}
    }

};

export const disconnect = () => {socket.disconnect(); socket = null;};

export const userJoin = userName => emitApi('userJoin', {userName});

export const fetchRate = (rate, socketId) => emitApi('findWinner', {rate, socketId});

// export const createRoom = (room, name='тест_user') => emitApi('createRoom', {room, name});

// export const roomLeave = room => emitApi('roomLeave', {room});

// export const getAllRooms = () => onApi('getAllRooms');