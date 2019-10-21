import * as socket from "../utils/socketUtils";
import * as types from "../constants/ActionsTypes";
import {GET_ROOMS} from "../constants/ApiConstants";
import {callApi} from "../utils/apiUtils";
import {FETCH_ROOMS} from "../constants/ActionsTypes";

export const userConnect = (userName) => dispatch => {

};

export const connectToServer = () => async dispatch => {
    await socket.connect();
};
export const leaveFromServer = () => async dispatch => {
    await socket.disconnect();
};

/**
 * подключение к комнате
 * @param name {string} имя игрока
 * @param room {string} имя комнаты
 * @returns {Function}
 */
export const joinInGame = (name, room) => async dispatch => {

    if (!name) {
        dispatch({type: types.GAME_UPDATE_STATUS, message: 'Нужно ввести имя'});
    } else {
        const {id, error} = await socket.userJoin(name, room);

        if(error) {
            dispatch({type: types.GAME_UPDATE_STATUS, error});
        } else {
            dispatch({type: types.SAVE_SOCKET_ID, id});
        }
    }
};

export const leaveFromRoom = () => async dispatch => {

};

export const fetchRooms = () => async dispatch => {
    const {rooms} = await callApi(GET_ROOMS);
    dispatch({type: FETCH_ROOMS, rooms});
};

const createRoomError = error => ({
    error,
});

export const createRoom = (userName, roomName) => async dispatch => {
    const {error, message} = socket.userJoin(userName, roomName);

    if(error) {
        dispatch(createRoomError(error));
    } else {
        dispatch({type: types.GAME_UPDATE_STATUS, message});
    }
};

export const joinInRoom = roomName => async dispatch => {

};

export const fitchGameResults = () => async dispatch => {

};


export const emitRate = rate => async dispatch => {
    await socket.emitRate(rate);
};

export const wWinner = () => async (dispatch, getState) => {
    const {winnerId, firstUserRate, secondUserRate} = await socket.subscribes().getWinner();

    const state = getState();
    const socketId = state.session.socketId;
    let gameResult = 'lose';

    if(winnerId === socketId) {
        gameResult = "win";
    }
    if(winnerId === 0) {
        gameResult = 'draw';
    }

    dispatch({type: types.GAME_FINISH, gameResult, enemyRate: secondUserRate, playerRate: firstUserRate});
};

// export const createRoom = (roomName, userName) => async dispatch => {
//     if (roomName) {
//         const userId = await api.createRoom(roomName, userName);
//
//         // dispatch({type: types.SET_USER, userId});
//         dispatch({type: types.ROOM_JOIN, currentRoom: roomName});
//         dispatch(fetchRooms());
//     }
// };

// export const fetchRooms = () => async dispatch => {
//     const rooms = await api.getAllRooms();
//
//     dispatch({type: types.FETCH_ROOMS_LIST, rooms});
// };