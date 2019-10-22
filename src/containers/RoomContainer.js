import React from "react";
import {connect} from "react-redux";
import Room from "../components/Room";

import {
    leaveFromRoom,
    emitRate,
    checkGameStatus,
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
    getGameCanStart,
} from "../selectors/commonSelectors";

const RoomContainer = props => <Room {...props}/>;

const mapStateToProps = state => {
    return {
        enemyRate: getEnemyRate(state),
        gameFinish: getGameFinish(state),
        gameResult: getGameResult(state),
        currentRoom: getCurrentRoom(state),
        playerRate: getPlayerRate(state),
        canStart: getGameCanStart(state),
    }
};

export default connect(mapStateToProps, {
    leaveFromRoom,
    emitRate,
    startNewGame,
    checkGameStatus,
})(RoomContainer);