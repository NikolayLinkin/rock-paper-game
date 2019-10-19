import React, {Component} from "react";
import {Link, Route} from "react-router-dom";
import PvEContainer from "../containers/PvEContainer";
import PvPContainer from "../containers/PvPContainer";

class Root extends Component {

    render() {

        return (
            <div className="wrapper">
                <Link to="/pve">PVE</Link>
                <br/>
                <Link to="pvp">PVP</Link>

                <Route exact path="/pve" component={PvEContainer}/>
                <Route exact path="/pvp" component={PvPContainer}/>
            </div>
        );
    }
}

export default Root;