import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from "../reducers/index";

export default function configureStore(initialState) {
    const composedEnhancers = composeWithDevTools(applyMiddleware(thunkMiddleware));

    const store = createStore(rootReducer, initialState, composedEnhancers);

    if(module.hot) {
        module.hot.accept('../reducers', () => {
            store.replaceReducer(rootReducer);
        })
    }

    return store;
}