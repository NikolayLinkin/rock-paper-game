import io from "socket.io-client";

/**
 * emit события
 * @param event {string}
 * @param data {object}
 * @returns {Promise<>}
 */
const emitApi = (event, data) => {
      return new Promise((resolve, reject) => {
         if(!socket) {
             reject('No socketApi connection');
         }

         socket.emit(event, data, (res) => {
             if(res.status === "Error" || res.error) {
                 const error = {
                   errText: res.error,
                   errStatus: res.status,
                 };
                 reject(error);
             }

             resolve(res);
         })
      });
};

let socket = null;
const endpoint = "http://localhost:3005";

export const connect = () => {
    socket = io.connect(endpoint);

    return socket;
};

export const disconnect = () => {socket.disconnect(); socket = null;};

/**
 *
 * @param userName {string} имя пользователя
 * @param roomName {string} название комнаты
 * @returns {Promise}
 */
export const userJoin = (userName, roomName) => emitApi('userJoin', {userName, roomName});

export const userLeave = roomName => emitApi('userLeave', {roomName});

/**
 * отправка ставки на сервер
 * @param rate {string} ставка
 * @returns {Promise}
 */
export const emitRate = (rate) => emitApi('userRate', {rate});

export const playAgain = () => emitApi('playAgain', ({}));