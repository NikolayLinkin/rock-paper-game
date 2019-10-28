import React, {Component} from "react";

import PvEWeapons from "../components/PvEWeapons";
import GameResult from "./GameResult";

class PvE extends Component {
    render() {
        const {
            playPvEGame,
            startNewPveGame,
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
                <PvEWeapons applyChoose={playPvEGame}
                         startNewGame={startNewPveGame}
                         gameFinish={gameFinish}
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