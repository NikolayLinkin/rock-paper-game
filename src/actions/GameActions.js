import * as types from "../constants/ActionsTypes";
import {playWithAi} from "../utils/gameUtils";

const gameFinish = () => ({
    type: types.GAME_FINISH,
});



export const setSelectedWeapon = (name) => ({
    type: types.GAME_SELECTED_WEAPON,
    name,
});

export const startGame = (playerRate) => dispatch => {
    const result = playWithAi(playerRate);

    dispatch({type: types.GAME_FINISH, result});
    dispatch(updateGameHistory(result));
};

const updateGameHistory = (lastGameResult) => ({
    type: types.UPDATE_GAME_HISTORY,
    lastGameResult,
});