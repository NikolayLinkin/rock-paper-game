import * as api from "../utils/apiUtils";
import * as types from "../constants/ActionsTypes";

export const userConnect = (userName) => dispatch => {

};

export const connectToServer = () => async dispatch => {
    await api.connect();
};
export const leaveFromServer = () => async dispatch => {
    await api.disconnect();
};

export const joinInGame = (name) => async dispatch => {
    // dispatch({type: types.GAME_START});


    if (!name) {
        dispatch({type: types.GAME_UPDATE_STATUS, message: 'Нужно ввести имя'});
    } else {
        const {id, error} = await api.userJoin(name);

        dispatch({type: types.SAVE_SOCKET_ID, id});
        dispatch({type: types.GAME_UPDATE_STATUS, error});
    }
};

export const fitchGameResults = () => async dispatch => {

};

export const fetchRate = rate => async (dispatch, getState) => {
    const state = getState();
    const socketId = state.session.socketId;

    await api.fetchRate(rate, socketId);
};

export const wWinner = () => async (dispatch, getState) => {
    const {winnerId, firstUserRate, secondUserRate} = await api.subscribes().getWinner();

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