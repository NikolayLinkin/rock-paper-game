import * as types from "../constants/ActionsTypes";

const initialState = {
    socketId: null,
    rooms: [],
    currentRoom: null,
    userName: null,
    errStatus: null,
    errText: null,
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

        case types.FETCH_ROOMS: {
            return {
                ...state,
                rooms: [...action.rooms],
            }
        }


        case types.ROOM_JOIN_SUCCESS: {
            return {
                ...state,
                currentRoom: action.currentRoom,
                userName: action.userName,
                socketId: action.socketId,
                errText: "",
                errStatus: "",
            }
        }

        case types.ROOM_JOIN_ERROR: {
            return {
                ...state,
                errText: action.errText,
                errStatus: action.errStatus,
            }
        }

        case types.ROOM_LEAVE: {
            return {
                ...state,
                currentRoom: null,
                socketId: null,
                userName: null,
            }
        }

        default: return state;
    }
};

export default session;