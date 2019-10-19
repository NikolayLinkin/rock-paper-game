import * as types from "../constants/ActionsTypes";
import {joinInGame} from "./PvPActions";

export const loginUser = userName => dispatch => {
  dispatch({type: types.SAVE_USER_NAME, userName});
  dispatch(joinInGame(userName));
};