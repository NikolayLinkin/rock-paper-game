import React from "react";
import {connect} from "react-redux";

import PvP from "../components/PvP";

import {
    connectToServer,
    checkGameStatus,
    leaveFromServer,
    fetchRooms,
    createRoom,
    emitRate,

    wWinner,
} from "../actions/PvPActions";

import {
    startNewGame,
} from "../actions/GameActions";

import {
    getRooms,
    getCurrentRoom,
    getUserName,
    getGameMessage,
} from "../selectors/commonSelectors";

const PvPContainer = props => <PvP {...props}/>;

const mapStateToProps = state => {
    return {
        roomsList: getRooms(state),
        currentRoom: getCurrentRoom(state),
        userName: getUserName(state),
        gameMessage: getGameMessage(state),
    }
};

export default connect(mapStateToProps, {
    connectToServer,
    checkGameStatus,
    leaveFromServer,
    fetchRooms,
    createRoom,
    emitRate,
    wWinner,
    startNewGame,
})(PvPContainer);