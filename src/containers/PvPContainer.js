import React from "react";
import {connect} from "react-redux";

import PvP from "../components/PvP";

import {
    connectToServer,
    leaveFromServer,
    fetchRooms,
    createRoom,

    joinInGame,
    emitRate,
    wWinner,
} from "../actions/PvPActions";

import {
    startNewGame,
} from "../actions/GameActions";

import {
    loginUser,
} from "../actions/SessionActions";

import {
    getRooms,
    getCurrentRoom,
    getGameFinish,
    getEnemyRate,
    getPlayerRate,
    getGameResult,
    getUserName,
    getGameMessage,
} from "../selectors/commonSelectors";

const PvPContainer = props => <PvP {...props}/>;

const mapStateToProps = state => {
    return {
        roomsList: getRooms(state),
        currentRoom: getCurrentRoom(state),
        enemyRate: getEnemyRate(state),
        playerRate: getPlayerRate(state),
        gameResult: getGameResult(state),
        gameFinish: getGameFinish(state),
        userName: getUserName(state),
        gameMessage: getGameMessage(state),
    }
};

export default connect(mapStateToProps, {
    connectToServer,
    leaveFromServer,
    fetchRooms,
    createRoom,

    joinInGame,
    loginUser,
    emitRate,
    wWinner,
    startNewGame,
})(PvPContainer);