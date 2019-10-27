import React, {Component} from "react";

import Weapons from "../components/Weapons";
import GameResult from "./GameResult";

class PvE extends Component {
    render() {
        const {
            startPvEGame,
            startNewGame,
            enemyRate,
            playerRate,
            gameResult,
            gameFinish,
        } = this.props;

        return (
            <div className="wrapper">
                <h2 className="title">
                    Для начала игры, нужно выбрать позицию:
                </h2>
                <Weapons applyChoose={startPvEGame}
                         startNewGame={startNewGame}
                         gameFinish={gameFinish}
                         canStart={true}
                />

                {gameFinish ?
                    <GameResult enemyRate={enemyRate}
                                playerRate={playerRate}
                                gameResult={gameResult}
                    />
                    : ''
                }
            </div>
        );
    }
}

export default PvE;