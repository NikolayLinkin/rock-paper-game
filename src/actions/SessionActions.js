import * as types from "../constants/ActionsTypes";
import * as api from "../utils/apiUtils";
import {joinInGame} from "./PvPActions";

export const loginUser = (userName, room) => dispatch => {
    dispatch({type: types.SAVE_USER_NAME, userName});
    dispatch(joinInGame(userName, room));
};

export const getRooms = () => async dispatch => {

    const rooms = await api.subscribes().getRooms();
    dispatch({type: types.FETCH_ROOMS_LIST, rooms});
};