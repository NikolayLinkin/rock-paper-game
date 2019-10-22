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

export const leaveFromRoom = (roomName) => async (dispatch, getState) => {
    await socket.userLeave();
    dispatch({type: types.ROOM_LEAVE, currentRoom: null});
};

export const fetchRooms = () => async dispatch => {
    const {rooms} = await callApi(GET_ROOMS);
    dispatch({type: FETCH_ROOMS, rooms});
};

const createRoomError = error => ({
    error,
});

//TODO: подумать как лучше проверять ограничение создания 2х комнат с одиноковым именем,
// по параметру или по названию события
/**
 * Создание новой комнаты
 * @param userName {string} имя игрока
 * @param roomName {string} название комнаты
 * @returns {Function}
 */
export const createRoom = (userName, roomName) => async dispatch => {
    const {error, socketId} = await socket.userJoin(userName, roomName);

    if(error) {
        dispatch(createRoomError(error));
    } else {
        dispatch({type: types.ROOM_JOIN, currentRoom: roomName, userName, socketId,});
        // dispatch({type: types.GAME_UPDATE_STATUS, message});
    }
};

export const checkGameStatus = () => async dispatch => {
    const {canStart} = await socket.subscribes().checkStatus();

    console.log(canStart);

    if(canStart) {
        dispatch({type: types.GAME_CAN_START});
    } else {
        dispatch({type: types.GAME_CANT_START});
    }
};

export const joinInRoom = roomName => async dispatch => {

};

export const fitchGameResults = () => async dispatch => {

};


//TODO: переделать(выводить ошибку)
export const emitRate = rate => async dispatch => {
    const {error}  = await socket.emitRate(rate);
    console.log(error);
};

//TODO: переделать
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