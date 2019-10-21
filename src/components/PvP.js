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
            fetchRooms,
            wWinner,
        } = this.props;

        connectToServer();
        fetchRooms();

        wWinner();
    }

    componentWillUnmount() {
        this.props.leaveFromServer();
    }

    createRoom = (e) => {
        e.preventDefault()

        const {createRoom} = this.props;

        createRoom('', '');
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
            loginUser,
            userName,
            emitRate,
            startNewGame,
            roomsList,
        } = this.props;

        return (
            <>

                {/*<InfoMessage message={gameMessage} color="red"/>*/}

                {!roomsList.length ? 'Нет созданных комнат' : JSON.stringify(roomsList)}
                <button onClick={this.createRoom}>Создать комнату</button>
                {/*{roomsList.map(room =>*/}
                {/*    <div key={room.id}>*/}
                {/*        {JSON.stringify(room)}*/}
                {/*    </div>*/}
                {/*)}*/}

                {/*{!userName ?*/}
                {/*    <UserNameForm loginUser={loginUser}/>*/}
                {/*    :*/}
                {/*    <Weapons applyChoose={emitRate}*/}
                {/*             gameFinish={gameFinish}*/}
                {/*             startNewGame={startNewGame}*/}
                {/*    />*/}
                {/*}*/}

                {gameFinish ?
                    <GameResult enemyRate={enemyRate}
                                playerRate={playerRate}
                                gameResult={gameResult}
                    /> : ""}
            </>
        );
    }
}

export default PvP;