import * as api from "../utils/apiUtils";


export const userConnect = (userName) => dispatch => {

};

export const createRoom = (roomName, userName) => async dispatch => {
    if(roomName) {
        const userId = await api.createRoom(roomName, userName);
        console.log(userId);
    }
};