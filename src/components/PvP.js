import React, {Component} from "react";
import WeaponsContainer from "../containers/WeaponsContainer";
import PropTypes from "prop-types";
import RoomsList from "./RoomsList";

class PvP extends Component {

    static propTypes = {
        createRoom: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.fetchRooms();
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
        const {roomsList, currentRoom, createRoom} = this.props;

        return (
            <div className="wrapper">
                <span onClick={() => this.createRoom()}>New Room</span>
                <br/>
                <span onClick={() => this.roomLeave()}>Leave room</span>
                <RoomsList rooms={roomsList}
                           joinToRoom={createRoom}
                           currentRoom={currentRoom}
                />

                {/*<div className="choose-panel">*/}
                {/*    <h2 className="title">*/}
                {/*        Для начала игры, нужно выбрать позицию:*/}
                {/*    </h2>*/}
                {/*    <WeaponsContainer/>*/}
                {/*</div>*/}

                {/*<div className="game__results">*/}

                {/*</div>*/}
            </div>
        );
    }
}

export default PvP;