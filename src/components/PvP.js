import React, {Component} from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";

import PopupForm from "./PopupForm";

class PvP extends Component {
    static propTypes = {
        connectToServer: PropTypes.func.isRequired,
        leaveFromServer: PropTypes.func.isRequired,
        fetchRooms: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            popupIsOpen: false,
        };
    }

    componentDidMount() {
        const {
            connectToServer,
            checkGameStatus,
            fetchRooms,
            wWinner,
        } = this.props;

        connectToServer();
        checkGameStatus();
        fetchRooms();

        wWinner();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const {currentRoom} = nextProps;
        if (currentRoom) {
            this.props.history.push(`/pvp/rooms/${currentRoom}`);
            return false;
        }
        return true;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {userName} = this.props;

        if (!userName) {
            console.log(1);
        } else {

        }
    }

    componentWillUnmount() {
        // this.props.leaveFromServer();
    }

    togglePopup = (e) => {
        e.preventDefault();
        this.setState(state => ({popupIsOpen: !state.popupIsOpen}));
    };

    joinInRoom = (roomName) => {
        let {
            createRoom,
            userName,
        } = this.props;

        userName = "Test";
        if (userName) {
            createRoom(userName, roomName);
        } else {

        }
    };

    render() {
        const {
            roomsList,
            createRoom,
        } = this.props;

        const {popupIsOpen} = this.state;

        return (
            <div className="wrapper">
                {roomsList.map(room =>
                    <div key={room.id} onClick={() => this.joinInRoom(room.name)} className="room-preview">
                        {room.name}
                    </div>
                )}
                {!roomsList.length ? 'Нет созданных комнат' : JSON.stringify(roomsList)}
                <button onClick={this.togglePopup}>Создать комнату</button>
                {popupIsOpen ?
                    <PopupForm createRoom={createRoom}
                               closePopup={this.togglePopup}
                    />
                    : ''}
                {/*{roomsList.map(room =>*/}
                {/*    <div key={room.id}>*/}
                {/*        {JSON.stringify(room)}*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>
        );
    }
}

export default withRouter(PvP);