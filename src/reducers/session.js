import * as types from "../constants/ActionsTypes";

const initialState = {
    userId: null,
    rooms: [],
    currentRoom: null,
};

const session = (state=initialState, action) => {
    switch (action.type) {
        case types.SET_USER: {
            return {
                ...state,
                userId: action.userId,
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