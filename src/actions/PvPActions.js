import * as socket from "../utils/socketUtils";
import * as types from "../constants/ActionsTypes";
import {GET_ROOMS} from "../constants/ApiConstants";
import {callApi} from "../utils/apiUtils";
import {FETCH_ROOMS} from "../constants/ActionsTypes";

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
            dispatch({type: types.GAME_RESET});
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

        for (let rate in rates) {
            if (rates.hasOwnProperty(rate)) {
                if (rate === socketId) {
                    playerRate = rates[rate];
                } else {
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

export const leaveFromRoom = () => async dispatch => {
    await socket.userLeave();
    dispatch({type: types.ROOM_LEAVE, currentRoom: null});
};

export const fetchRooms = () => async dispatch => {
    const {rooms} = await callApi(GET_ROOMS);
    dispatch({type: FETCH_ROOMS, rooms});
};

const joinInRoomError = (errText, errStatus) => ({
    type: types.ROOM_JOIN_ERROR,
    errText,
    errStatus,
});

const joinInRoomSuccess = (currentRoom, userName, socketId) => ({
    type: types.ROOM_JOIN_SUCCESS,
    currentRoom,
    userName,
    socketId,
});

//TODO: подумать как лучше проверять ограничение создания 2х комнат с одиноковым именем,
// по параметру или по названию события
/**
 * Создание новой комнаты
 * @param userName {string} имя игрока
 * @param roomName {string} название комнаты
 * @returns {Function}
 */
export const joinInRoom = (userName, roomName) => async dispatch => {
    try {
        const {socketId} = await socket.userJoin(userName, roomName);
        dispatch(joinInRoomSuccess(roomName, userName, socketId));
    } catch (error) {
        const {errText, errStatus} = error;
        dispatch(joinInRoomError(errText, errStatus));
    }
};

export const login = (userName) => ({
    type: types.SAVE_USER_NAME,
    userName,
});


//TODO: переделать(выводить ошибку)
export const emitRate = rate => async dispatch => {
    const {error} = await socket.emitRate(rate);

    if(error) {
        console.log(error);
    }
};