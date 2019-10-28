import React from "react";
import {connect} from "react-redux";

import PvE from "../components/PvE";

import {
    playPvEGame,
    startNewPveGame,
} from "../actions/GameActions";

import {
    getEnemyRate,
    getPlayerRate,
    getGameResult,
    getGameFinish,
} from "../selectors/commonSelectors";

const PvEContainer = props => <PvE {...props}/>;

const mapStateToProps = state => {
    return {
        enemyRate: getEnemyRate(state),
        playerRate: getPlayerRate(state),
        gameResult: getGameResult(state),
        gameFinish: getGameFinish(state),
    }
};

export default connect(mapStateToProps, {
    playPvEGame,
    startNewPveGame,
})(PvEContainer);