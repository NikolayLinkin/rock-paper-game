import React from "react";
import {connect} from "react-redux";

import PvP from "../components/PvP";

import {
    connectToServer,
    leaveFromServer,
    fetchRooms,
    joinInRoom,
    emitRate,
    login,
} from "../actions/PvPActions";

import {
    startNewGame,
} from "../actions/GameActions";

import {
    getRooms,
    getCurrentRoom,
    getUserName,
    getGameMessage,
    getSessionErrorText,
    getSessionErrorStatus,
} from "../selectors/commonSelectors";

const PvPContainer = props => <PvP {...props}/>;

const mapStateToProps = state => {
    return {
        roomsList: getRooms(state),
        currentRoom: getCurrentRoom(state),
        userName: getUserName(state),
        gameMessage: getGameMessage(state),
        sessionErrText: getSessionErrorText(state),
        sessionErrStatus: getSessionErrorStatus(state),
    }
};

export default connect(mapStateToProps, {
    connectToServer,
    leaveFromServer,
    fetchRooms,
    joinInRoom,
    emitRate,
    startNewGame,
    login,
})(PvPContainer);