import React, {Component} from "react";
import WeaponsContainer from "../containers/WeaponsContainer";

class PvE extends Component {
    render() {

        return (
            <div className="wrapper">
                <div className="choose-panel">
                    <h2 className="title">
                        Для начала игры, нужно выбрать позицию:
                    </h2>
                    <WeaponsContainer/>
                </div>

                <div className="game__results">

                </div>
            </div>
        );
    }
}

export default PvE;