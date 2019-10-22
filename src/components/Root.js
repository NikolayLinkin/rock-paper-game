import React, {Component} from "react";
import {Route} from "react-router-dom";
import PvEContainer from "../containers/PvEContainer";
import PvPContainer from "../containers/PvPContainer";
import Room from "../components/Room";
import ChooseGameMode from "./ChooseGameMode";


class Root extends Component {

    render() {

        return (
            <>
                <Route exact path="/" component={ChooseGameMode}/>
                <Route exact path="/pve" component={PvEContainer}/>
                <Route exact path="/pvp" component={PvPContainer}/>
                <Route exact path="/pvp/rooms/:id" component={Room}/>
            </>
        );
    }
}

export default Root;