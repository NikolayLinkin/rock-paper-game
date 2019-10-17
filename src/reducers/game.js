import * as types from "../constants/ActionsTypes";

const initialState = {
    gameMode: null,
    finish: false,
    loading: false,
    actionsHistory: [],
    result: null,
    aiRate: null,
    selectedWeapon: null,
    history: [],
};

const game = (state = initialState, action) => {
    switch (action.type) {
        case types.GAME_CHANGE_MODE: {
            return {
                ...state,
                gameMode: action.gameMode,
            }
        }
        case types.GAME_START: {
            return {
                ...state,
                finish: false,
            }
        }
        case types.GAME_FINISH: {
            return {
                ...state,
                result: action.gameResult,
                aiRate: action.aiRate,
                finish: true,
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