import React from "react";
import {connect} from "react-redux";
import Room from "../components/Room";

import {
    leaveFromRoom,
    emitRate,
} from "../actions/PvPActions";

import {
    startNewGame,
} from "../actions/GameActions";


import {
    getCurrentRoom,
    getGameFinish,
    getGameResult,
    getPlayerRate,
    getEnemyRate,
} from "../selectors/commonSelectors";

const RoomContainer = props => <Room {...props}/>;

const mapStateToProps = state => {
    return {
        enemyRate: getEnemyRate(state),
        gameFinish: getGameFinish(state),
        gameResult: getGameResult(state),
        currentRoom: getCurrentRoom(state),
        playerRate: getPlayerRate(state),
    }
};

export default connect(mapStateToProps, {
    leaveFromRoom,
    emitRate,
    startNewGame,
})(RoomContainer);