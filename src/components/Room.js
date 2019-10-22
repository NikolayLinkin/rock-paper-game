import React, {Component} from "react";
import Weapons from "./Weapons";
import GameResult from "./GameResult";

class Room extends Component {
    render () {
        const {
            emitRate,
            gameFinish,
            startNewGame,
            enemyRate,
            playerRate,
            gameResult,
        } = this.props;
        return (
            <div className="wrapper">

                <Weapons applyChoose={emitRate}
                         gameFinish={gameFinish}
                         startNewGame={startNewGame}
                />

                {gameFinish ?
                    <GameResult enemyRate={enemyRate}
                                playerRate={playerRate}
                                gameResult={gameResult}
                    /> : ""}

            </div>
        )
    }
}

export default Room;