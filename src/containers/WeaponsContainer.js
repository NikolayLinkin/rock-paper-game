import React from "react";
import {connect} from "react-redux";

import Weapons from "../components/Weapons";

import {
    getGameResult,
    getGameHistory,
    getGameFinish,
} from "../selectors/commonSelectors";



const WeaponsContainer = props => <Weapons {...props}/>;

const mapStateToProps = state => {
    return {
        gameResult: getGameResult(state),
        gameHistory: getGameHistory(state),
        gameFinish: getGameFinish(state),
    };
};

export default connect(mapStateToProps, {

})(WeaponsContainer);