import React, {Component} from "react";
import PropTypes from "prop-types";


import InfoMessage from "./InfoMessages";
import UserNameForm from "./UserNameForm";
import Weapons from "./Weapons";
import GameResult from "./GameResult";

class PvP extends Component {

    static propTypes = {
        createRoom: PropTypes.func.isRequired
    };

    componentDidMount() {
        const {
            connectToServer,
            joinInGame,
            userName,
            wWinner,
        } = this.props;

        connectToServer();
        wWinner();

        // joinInGame(userName);

        // this.props.fetchRooms();
    }

    componentWillUnmount() {
        this.props.leaveFromServer();
    }

    createRoom = (roomName) => {
        roomName = 'my first room';
        const userName = `user ${new Date()}`;

        const {
            createRoom
        } = this.props;

        createRoom(roomName, userName);
    };

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
            gameMessage,
            loginUser,
            userName,
            fetchRate,
        } = this.props;

        return (
            <>

                {/*<Weapons applyChoose={1} gameFinis={gameFinish} startNewGame={1}/>*/}
                {/*<InfoMessage message={gameMessage} color="red"/>*/}
                {!userName ?
                    <UserNameForm loginUser={loginUser}/>
                    :
                    <Weapons applyChoose={fetchRate} gameFinish={gameFinish} startNewGame={fetchRate}/>
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