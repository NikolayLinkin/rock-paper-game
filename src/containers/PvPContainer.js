import React from "react";
import {connect} from "react-redux";

import PvP from "../components/PvP";

import {createRoom} from "../actions/PvPActions";

const PvPContainer = props => <PvP {...props}/>;

const mapStateToProps = state => {
    return {

    }
};

export default connect(mapStateToProps, {
    createRoom,
})(PvPContainer);