import React from "react";
import {connect} from "react-redux";

import Weapons from "../components/Weapons";

import {
    getGameResult,
    getGameHistory,
} from "../selectors/commonSelectors";

import {
    startGame,
} from "../actions/GameActions";

const WeaponsContainer = props => <Weapons {...props}/>;

const mapStateToProps = state => {
    return {
        gameResult: getGameResult(state),
        gameHistory: getGameHistory(state),
    };
};

export default connect(mapStateToProps, {
    startGame,
})(WeaponsContainer);