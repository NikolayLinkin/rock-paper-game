import * as types from "../constants/ActionsTypes";
import {playWithAi} from "../utils/PvEUtils";
import {playAgain} from "../utils/socketUtils";


const gameFinish = (gameResult, enemyRate, playerRate) => ({
    type: types.GAME_FINISH,
    gameResult,
    enemyRate,
    playerRate,
});

export const playPvEGame = (playerRate) => dispatch => {
    const {gameResult, aiRate} = playWithAi(playerRate);

    dispatch(gameFinish(gameResult, aiRate, playerRate));
};

export const startNewPveGame =() => dispatch => {
    dispatch({type: types.GAME_RESET});
    dispatch({type: types.GAME_START});
};

export const startNewGame = () => async dispatch => {
    dispatch({type: types.GAME_RESET});
    await playAgain();
    dispatch({type: types.GAME_START});
};