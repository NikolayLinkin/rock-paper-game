import React, {Component} from "react";
import PropTypes from "prop-types";
import Weapons from "./Weapons";
import GameResult from "./GameResult";
import {withRouter} from "react-router-dom";

class Room extends Component {
    static propTypes = {
        leaveFromRoom: PropTypes.func.isRequired,
        emitRate: PropTypes.func.isRequired,
        gameFinish: PropTypes.bool.isRequired,
        startNewGame: PropTypes.func.isRequired,
        enemyRate: PropTypes.string,
        playerRate: PropTypes.string,
        gameResult: PropTypes.string,
        currentRoom: PropTypes.string,
    };

    componentDidMount() {
        if(!this.props.currentRoom) {
            this.props.history.push('/pvp');
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const {currentRoom} = nextProps;
        if(!currentRoom) {
            this.props.history.push('/pvp');
            return false;
        }

        return true;
    }

    componentWillUnmount() {
        this.props.leaveFromRoom();
    }

    leave = (e) => {
        e.preventDefault();

        this.props.history.push('/pvp');
    };

    render () {
        const {
            emitRate,
            gameFinish,
            startNewGame,
            enemyRate,
            playerRate,
            gameResult,
            canStart,
            currentRoom,
        } = this.props;
        return (
            <div className="wrapper">
                <h2 className="room__title">
                    Комната {currentRoom}
                </h2>
                <button className="room__leave-btn"
                        onClick={this.leave}>
                    Выйти из комнаты
                </button>

                <Weapons applyChoose={emitRate}
                         gameFinish={gameFinish}
                         startNewGame={startNewGame}
                         canStart={canStart}
                         playerRate={playerRate}
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

export default withRouter(Room);