import React, {Component} from "react";
import PropTypes from "prop-types";
import {joinInRoom} from "../../actions/PvPActions";

class PopupLogin extends Component {
    static propTypes = {
        joinInRoom: PropTypes.func.isRequired,
        closePopup: PropTypes.func.isRequired,
        roomName: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.userName = React.createRef();

        this.state = {
            error: '',
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const userName = this.userName.current.value;
        const {
            joinInRoom,
            login,
            closePopup,
            chooseRoom,
        } = this.props;

        if (!userName.length) {
            this.setState(state => ({error: 'Заполните все поля формы'}));
            return false;
        }

        if(chooseRoom) {
            joinInRoom(userName, chooseRoom);
        } else {
            login(userName);
            closePopup();
        }

        this.userName.current.value = '';
    };

    render() {
        const {error} = this.state;
        const {closePopup, errorText} = this.props;

        return (
            <div className="popup">
                <div className="popup__inner">
                    <form onSubmit={this.handleSubmit}>
                        {error ? <div style={{color: 'red'}}>{error}</div> : ''}
                        {errorText ? <div style={{color: 'red'}}>{errorText}</div> : ''}

                        <div>
                            <label>Введите имя</label>
                            <input ref={this.userName} type="text"/>
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

export default PopupLogin;