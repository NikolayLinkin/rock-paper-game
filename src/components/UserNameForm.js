import React, {Component} from "react";
import PropTypes from "prop-types";

class UserNameForm extends Component {
    static propTypes = {
        loginUser: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.input = null;
        this.state = {error: ''};
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const {value} = this.input;

        if(!value.length) {
            this.setState(state => ({error: 'Имя не может быть пустым'}));
        }

        this.props.loginUser(value, '1234');
        this.input.value = '';

    };

    render() {
        const {error} = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                {error ? <div style={{color: 'red'}}>{error}</div> : ''}
                <label>Введите имя</label>
                <input ref={node => this.input = node} type="text"/>

                <button>Подтвердить</button>
            </form>
        )
    }
}

export default UserNameForm;