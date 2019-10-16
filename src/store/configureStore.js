import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension/developmentOnly";
import rootReducer from "../reducers";

export default function configureStore (initialState) {

    const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));

    if(module.hot) {
        module.hot.accept('../reducers', () => {
           store.replaceReducer(rootReducer);
        });
    }

    return store;
};