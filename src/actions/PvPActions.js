import * as socket from "../utils/socketUtils";
import * as types from "../constants/ActionsTypes";
import {GET_ROOMS} from "../constants/ApiConstants";
import {callApi} from "../utils/apiUtils";
import {FETCH_ROOMS} from "../constants/ActionsTypes";

export const userConnect = (userName) => dispatch => {

};

const gameWinnerSuccess = (gameResult, enemyRate, playerRate) => ({
    type: types.GAME_FINISH,
    gameResult,
    enemyRate,
    playerRate,
});

export const connectToServer = () => async (dispatch, getState) => {
    const socketApi = await socket.connect();

    socketApi.on('checkStatus', res => {
        const {canStart} = res;

        if (canStart) {
            dispatch({type: types.GAME_CAN_START});
        } else {
            dispatch({type: types.GAME_CANT_START});
        }
    });

    /**
     * res = {winnerId, rates, draw}
     */
    socketApi.on('getWinner', res => {
        const {winnerId, rates, draw} = res;

        const state = getState();
        const socketId = state.session.socketId;

        let gameResult = null,
            enemyRate = null,
            playerRate = null;

        for(let rate in rates) {
            if(rates.hasOwnProperty(rate)) {
                if( rate === socketId) {
                    playerRate = rates[rate];
                } else{
                    enemyRate = rates[rate];
                }
            }
        }

        if (draw) {
            gameResult = "draw";
        } else if (winnerId === socketId) {
            gameResult = "win";
        } else {
            gameResult = "lose";
        }

        //TODO: сделать 3 события GAME_DRAW, GAME_LOSE, GAME_WIN,
        dispatch(gameWinnerSuccess(gameResult, enemyRate, playerRate));
    });

};
export const leaveFromServer = () => async dispatch => {
    await socket.disconnect();
    dispatch({type: types.ROOM_LEAVE, currentRoom: null});
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

    if (error) {
        dispatch(createRoomError(error));
    } else {
        dispatch({type: types.ROOM_JOIN, currentRoom: roomName, userName, socketId,});
        // dispatch({type: types.GAME_UPDATE_STATUS, message});
    }
};


//TODO: переделать(выводить ошибку)
export const emitRate = rate => async dispatch => {
    const {error} = await socket.emitRate(rate);
    console.log(error);
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