import * as types from "../constants/ActionsTypes";
import {playWithAi} from "../utils/gameUtils";



export const setSelectedWeapon = (name) => ({
    type: types.GAME_SELECTED_WEAPON,
    name,
});

export const startGame = (playerRate) => dispatch => {
    const {gameResult, aiRate} = playWithAi(playerRate);

    dispatch({type: types.GAME_FINISH, gameResult, aiRate});
    dispatch(updateGameHistory(gameResult));
};

const updateGameHistory = (lastGameResult) => ({
    type: types.UPDATE_GAME_HISTORY,
    lastGameResult,
});