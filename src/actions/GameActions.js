import * as types from "../constants/ActionsTypes";
import {playWithAi} from "../utils/PvEUtils";


const gameFinish = (gameResult, enemyRate, playerRate) => ({
    type: types.GAME_FINISH,
    gameResult,
    enemyRate,
    playerRate,
});

export const startPvEGame = (playerRate) => dispatch => {
    const {gameResult, aiRate} = playWithAi(playerRate);

    dispatch(gameFinish(gameResult, aiRate, playerRate));
    // dispatch(updateGameHistory(gameResult));
};

export const startNewGame = () => dispatch => {
    dispatch({type: types.GAME_START});
};

const updateGameHistory = (lastGameResult) => ({
    type: types.UPDATE_GAME_HISTORY,
    lastGameResult,
});