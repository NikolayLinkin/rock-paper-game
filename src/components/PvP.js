import React, {Component} from "react";
import PropTypes from "prop-types";


import InfoMessage from "./InfoMessages";
import UserNameForm from "./UserNameForm";
import Weapons from "./Weapons";
import GameResult from "./GameResult";

class PvP extends Component {

    static propTypes = {
        // createRoom: PropTypes.func.isRequired
    };

    componentDidMount() {
        const {
            connectToServer,
            wWinner,
            getRooms,
        } = this.props;

        connectToServer();
        getRooms();
        wWinner();
    }

    componentWillUnmount() {
        this.props.leaveFromServer();
    }

    roomLeave = (roomName) => {
        roomName = 'my first room';

        this.props.roomLeave(roomName);
    };

    render() {
        const {
            gameResult,
            enemyRate,
            playerRate,
            gameFinish,
            loginUser,
            userName,
            fetchRate,
            startNewGame,
        } = this.props;

        return (
            <>

                {/*<InfoMessage message={gameMessage} color="red"/>*/}
                {!userName ?
                    <UserNameForm loginUser={loginUser}/>
                    :
                    <Weapons applyChoose={fetchRate}
                             gameFinish={gameFinish}
                             startNewGame={startNewGame}
                    />
                }

                {gameFinish ?
                    <GameResult enemyRate={enemyRate}
                                playerRate={playerRate}
                                gameResult={gameResult}
                    /> : "" }
            </>
        );
    }
}

export default PvP;