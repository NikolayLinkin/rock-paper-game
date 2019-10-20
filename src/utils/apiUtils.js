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
        getWinner() {return onApi('getWinner')},
        getRooms() {return onApi('getRoomsList')},
    }

};

export const disconnect = () => {socket.disconnect(); socket = null;};

/**
 *
 * @param userName {string} имя пользователя
 * @param roomName {string} название комнаты
 * @returns {Promise}
 */
export const userJoin = (userName, roomName) => emitApi('userJoin', {userName, roomName});

export const fetchRate = (rate, socketId) => emitApi('userRate', {rate});