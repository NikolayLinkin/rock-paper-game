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


const endpoint = "http://localhost:3005";

const socket = socketIOClient(endpoint);

export const joinToRoom = roomName => `JoinToRoom ${roomName}`;

export const createRoom = (room, name='тест_user') => emitApi('createRoom', {room, name});

socket.on('userConnect', data => {
    console.dir(data);
})


socket.on('login', data => {
    console.log(data);
});

socket.on('user joined', data => {
   console.log(data);
});

socket.on('show rooms list', data => {
    console.dir(data);
});