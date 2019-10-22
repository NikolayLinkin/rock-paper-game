import React, {Component} from "react";
import {Route} from "react-router-dom";
import PvEContainer from "../containers/PvEContainer";
import PvPContainer from "../containers/PvPContainer";
import RoomContainer from "../containers/RoomContainer";
import ChooseGameMode from "./ChooseGameMode";


class Root extends Component {

    render() {

        return (
            <>
                <Route exact path="/" component={ChooseGameMode}/>
                <Route exact path="/pve" component={PvEContainer}/>
                <Route exact path="/pvp" component={PvPContainer}/>
                <Route exact path="/pvp/rooms/:id" component={RoomContainer}/>
            </>
        );
    }
}

export default Root;