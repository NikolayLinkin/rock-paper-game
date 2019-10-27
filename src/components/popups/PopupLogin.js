import React, {Component} from "react";
import PropTypes from "prop-types";

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
            this.setState(state => ({error: 'Заполните имя'}));
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
                        {error ? <div className="popup__error">{error}</div> : ''}
                        {errorText ? <div className="popup__error">{errorText}</div> : ''}

                        <input className="popup__input"
                               placeholder="Имя игрока"
                               ref={this.userName} type="text"/>

                        <button className="popup__btn">
                            Подтвердить
                        </button>
                        <button className="popup__btn popup__btn--close"
                                onClick={closePopup}>
                            Отмена
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default PopupLogin;