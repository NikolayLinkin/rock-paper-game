import React, {Component} from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";

import RoomsList from "./RoomsList";
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
            openPopupName: "",
            chooseRoom: "",
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
        const {currentRoom, userName} = nextProps;
        if (currentRoom && userName) {
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
            sessionErrStatus,
        } = this.props;

        //TODO: додумать логику ошибки
        if (sessionErrStatus === "Error") {
            this.togglePopup('login');
        }

        if (userName) {
            joinInRoom(userName, roomName);
        } else {
            this.togglePopup('login');
            this.setState(state => ({chooseRoom: roomName}));
        }
    };

    render() {
        const {
            roomsList,
            joinInRoom,
            login,
            sessionErrText,
        } = this.props;


        const {
            openPopupName,
            chooseRoom,
        } = this.state;

        return (
            <div className="wrapper">
                {!roomsList.length ?
                    'Нет созданных комнат' :
                    <RoomsList rooms={roomsList} joinInRoom={this.joinInRoom}/>
                }
                <button onClick={() => {this.togglePopup('create-room')}}>
                    Создать комнату
                </button>

                {openPopupName === "create-room" ?
                    <PopupCreateRoom joinInRoom={joinInRoom}
                                     closePopup={this.closePopup}
                    /> : ''}

                {openPopupName === "login" ?
                    <PopupLogin joinInRoom={joinInRoom}
                                login={login}
                                chooseRoom={chooseRoom}
                                errorText={sessionErrText}
                                closePopup={this.closePopup}
                    /> : ''}
            </div>
        );
    }
}

export default withRouter(PvP);