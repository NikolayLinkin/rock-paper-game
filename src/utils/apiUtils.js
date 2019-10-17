import socketIOClient from "socket.io-client";

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


const endpoint = "http://localhost:3005";

const socket = socketIOClient(endpoint);

export const createRoom = (room, name='тест_user') => emitApi('createRoom', {room, name});

export const roomLeave = room => emitApi('roomLeave', {room});

export const getAllRooms = () => onApi('getAllRooms');