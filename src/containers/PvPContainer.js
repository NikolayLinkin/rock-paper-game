import React from "react";
import {connect} from "react-redux";

import PvP from "../components/PvP";

import {
    connectToServer,
    leaveFromServer,

    joinInGame,
    fetchRate,
    wWinner,
} from "../actions/PvPActions";

import {
    startNewGame,
} from "../actions/GameActions";

import {
    loginUser,
    getRooms,
} from "../actions/SessionActions";

import {
    getRoomsList,
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
        roomsList: getRoomsList(state),
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

    joinInGame,
    loginUser,
    fetchRate,
    wWinner,
    startNewGame,
    getRooms,
})(PvPContainer);