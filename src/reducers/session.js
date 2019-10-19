import * as types from "../constants/ActionsTypes";

const initialState = {
    socketId: null,
    rooms: [],
    currentRoom: null,
    userName: null,
};

const session = (state=initialState, action) => {
    switch (action.type) {
        case types.SAVE_SOCKET_ID: {
            return {
                ...state,
                socketId: action.id,
            }
        }

        case types.SAVE_USER_NAME: {
            return {
                ...state,
                userName: action.userName,
            }
        }

        case types.FETCH_ROOMS_LIST: {
            return {
                ...state,
                rooms: action.rooms,
            }
        }

        case types.ROOM_JOIN: {
            return {
                ...state,
                currentRoom: action.currentRoom,
            }
        }

        case types.ROOM_LEAVE: {
            return {
                ...state,
                currentRoom: null,
            }
        }

        default: return state;
    }
};

export default session;