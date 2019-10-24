import React, {Component} from "react";
import PropTypes from "prop-types";

class PopupCreateRoom extends Component {
    static propTypes = {
        joinInRoom: PropTypes.func.isRequired,
        closePopup: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.userName = React.createRef();
        this.roomName = React.createRef();

        this.state = {
            error: '',
            needRoomName: false,
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {joinInRoom} = this.props;
        const userName = this.userName.current.value;
        const roomName = this.roomName.current.value;

        if (!userName.length || !roomName.length) {
            this.setState(state => ({error: 'Заполните все поля формы'}));
            return false;
        }

        joinInRoom(userName, roomName);

        this.userName.current.value = '';
        this.roomName.current.value = '';
    };

    render() {
        const {error} = this.state;
        const {closePopup} = this.props;

        return (
            <div className="popup">
                <div className="popup__inner">
                    <form onSubmit={this.handleSubmit}>
                        {error ? <div style={{color: 'red'}}>{error}</div> : ''}

                        <div>
                            <label>Введите имя</label>
                            <input ref={this.userName} type="text"/>
                        </div>

                        <div>
                            <label>Введите название комнаты</label>
                            <input ref={this.roomName} type="text"/>
                        </div>

                        <button>Подтвердить</button>
                        <button onClick={closePopup}>
                            Отмена
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default PopupCreateRoom;