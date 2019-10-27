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
                <form onSubmit={this.handleSubmit}>
                    {error ? <div className="popup__error">{error}</div> : ''}

                    <input className="popup__input"
                           placeholder="Имя игрока"
                           ref={this.userName} type="text"/>

                    <input className="popup__input"
                           placeholder="Название комнаты"
                           ref={this.roomName} type="text"/>

                    <button className="popup__btn">
                        Подтвердить
                    </button>
                    <button onClick={closePopup}
                            className="popup__btn popup__btn--close">
                        Отмена
                    </button>
                </form>
            </div>
        )
    }
}

export default PopupCreateRoom;