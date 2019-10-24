import React, {Component} from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";

import PopupCreateRoom from "./popups/PopupCreateRoom";
import PopupLogin from "./popups/PopupLogin";

class PvP extends Component {
    static propTypes = {
        connectToServer: PropTypes.func.isRequired,
        leaveFromServer: PropTypes.func.isRequired,
        fetchRooms: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            openPopupName: false,
        };
    }

    componentDidMount() {
        const {
            connectToServer,
            fetchRooms,
        } = this.props;

        connectToServer();
        fetchRooms();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const {currentRoom} = nextProps;
        if (currentRoom) {
            this.props.history.push(`/pvp/rooms/${currentRoom}`);
            return false;
        }
        return true;
    }

    togglePopup = (popupName) => {
        this.setState(state => ({openPopupName: popupName}));
    };

    closePopup = () => {
        this.togglePopup("none");
    };

    joinInRoom = (roomName) => {
        const {
            joinInRoom,
            userName,
        } = this.props;

        if (userName) {
            joinInRoom(userName, roomName);
        } else {
            this.togglePopup('login');
        }
    };

    render() {
        const {
            roomsList,
            joinInRoom,
            login,
        } = this.props;

        const {openPopupName} = this.state;

        return (
            <div className="wrapper">
                {roomsList.map(room =>
                    <div key={room.id} onClick={() => this.joinInRoom(room.name)} className="room-preview">
                        {room.name}
                    </div>
                )}
                {!roomsList.length ? 'Нет созданных комнат' : JSON.stringify(roomsList)}
                <button onClick={() => {this.togglePopup('create-room')}}>Создать комнату</button>
                {openPopupName === "create-room" ?
                    <PopupCreateRoom joinInRoom={joinInRoom}
                                     closePopup={this.closePopup}
                    /> : ''}

                {openPopupName === "login" ?
                    <PopupLogin joinInRoom={joinInRoom}
                                login={login}
                                closePopup={this.closePopup}
                    /> : ''}


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