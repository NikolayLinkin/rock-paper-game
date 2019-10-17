import React from "react";
import {connect} from "react-redux";

import PvP from "../components/PvP";

import {
    createRoom,
    fetchRooms,
    roomLeave,
} from "../actions/PvPActions";

import {getRoomsList, getCurrentRoom} from "../selectors/commonSelectors";

const PvPContainer = props => <PvP {...props}/>;

const mapStateToProps = state => {
    return {
        roomsList: getRoomsList(state),
        currentRoom: getCurrentRoom(state),
    }
};

export default connect(mapStateToProps, {
    createRoom,
    fetchRooms,
    roomLeave,
})(PvPContainer);