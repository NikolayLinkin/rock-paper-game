import React, {Component} from "react";
import PropTypes from "prop-types";

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

    togglePopup = (e) => {
        e.preventDefault();
        this.setState(state => ({popupIsOpen: !state.popupIsOpen}));
    };

    roomLeave = (roomName) => {
        roomName = 'my first room';

        this.props.roomLeave(roomName);
    };

    render() {
        const {
            roomsList,
            createRoom,
        } = this.props;

        const {popupIsOpen} = this.state;

        return (
            <div className="wrapper">
                {!roomsList.length ? 'Нет созданных комнат' : JSON.stringify(roomsList)}
                <button onClick={this.togglePopup}>Создать комнату</button>
                {popupIsOpen ?
                    <PopupForm createRoom={createRoom} closePopup={this.togglePopup}/>
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

export default PvP;