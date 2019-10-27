import * as types from "../constants/ActionsTypes";
import {playWithAi} from "../utils/PvEUtils";
import {playAgain} from "../utils/socketUtils";


const gameFinish = (gameResult, enemyRate, playerRate) => ({
    type: types.GAME_FINISH,
    gameResult,
    enemyRate,
    playerRate,
});

export const startPvEGame = (playerRate) => dispatch => {
    const {gameResult, aiRate} = playWithAi(playerRate);

    dispatch(gameFinish(gameResult, aiRate, playerRate));
};

export const startNewGame = () => async dispatch => {
    await playAgain();
    dispatch({type: types.GAME_START});
};