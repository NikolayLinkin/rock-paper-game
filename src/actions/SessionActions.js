import * as types from "../constants/ActionsTypes";

export const loginUser = userName => dispatch => {
    dispatch({type: types.SAVE_USER_NAME, userName});
};