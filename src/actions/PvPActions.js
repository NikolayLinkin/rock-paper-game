import * as api from "../utils/apiUtils";
import * as types from "../constants/ActionsTypes";

export const userConnect = (userName) => dispatch => {

};

export const createRoom = (roomName, userName) => async dispatch => {
    if(roomName) {
        const userId = await api.createRoom(roomName, userName);

        dispatch({type: types.SET_USER, userId});
        dispatch({type: types.ROOM_JOIN, currentRoom: roomName});
        dispatch(fetchRooms());
    }
};

export const roomLeave = (roomName) => async dispatch => {
    dispatch({type: types.ROOM_LEAVE});

    if(roomName) {
        await api.roomLeave(roomName);
    }
};

export const fetchRooms = () => async dispatch => {
    const rooms = await api.getAllRooms();

    dispatch({type: types.FETCH_ROOMS_LIST, rooms});
};