import * as types from "../constants/ActionsTypes";

const initialState = {
    gameMode: null,
    finish: false,
    canStart: false,
    result: null,
    enemyRate: null,
    selectedWeapon: null,
    loading: false,
    message: null,
};

const game = (state = initialState, action) => {
    switch (action.type) {
        case types.GAME_START: {
            return {
                ...state,
                finish: false,
                result: null,
                enemyRate: null,
                playerRate: null,
            }
        }
        case types.GAME_FINISH: {
            return {
                ...state,
                result: action.gameResult,
                enemyRate: action.enemyRate,
                playerRate: action.playerRate,
                canStart: true,
                finish: true,
            }
        }
        case types.GAME_CAN_START: {
            return {
                ...state,
                canStart: true,
            }
        }

        case types.GAME_CANT_START: {
            return {
                ...state,
                canStart: false,
            }
        }

        case types.GAME_UPDATE_STATUS: {
            return {
                ...state,
                message: action.message,
            }
        }
        case types.UPDATE_GAME_HISTORY: {
            return {
                ...state,
                history: [...state.history, action.lastGameResult]
            }
        }
        default: return state;
    }
};

export default game;