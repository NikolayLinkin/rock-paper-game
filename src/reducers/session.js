import * as types from "../constants/ActionsTypes";

const initialState = {
    userId: null,
};

const session = (state=initialState, action) => {
    switch (action.type) {
        case types: {
            return {
                ...state,
            }
        }
        default: return state;
    }
};

export default session;