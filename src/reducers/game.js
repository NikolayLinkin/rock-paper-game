import * as types from "../constants/ActionsTypes";

const initialState = {

};

const game = (state=initialState, action) => {
    switch(action.type) {
        case types.GAME_START: {
            return {
                ...state,
            }
        }
        default: return state;
    }
};

export {game};