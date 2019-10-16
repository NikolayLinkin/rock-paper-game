import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {AppContainer} from "react-hot-loader";
import createStore from "./store/createStore";
import "./styles/styles.scss";
import RootContainer from "./containers/RootContainer";


ReactDOM.render(
    <AppContainer>
        <Provider store={createStore()}>
            <RootContainer/>
        </Provider>
    </AppContainer>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
