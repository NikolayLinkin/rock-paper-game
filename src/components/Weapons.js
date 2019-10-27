import React, {Component} from "react";
import PropTypes from "prop-types";

import WeaponItem from "./WeaponsItem";
// import classNames from "classnames";

class Weapons extends Component {
    static propTypes = {
        applyChoose: PropTypes.func.isRequired,
        startNewGame: PropTypes.func.isRequired,
        gameFinish: PropTypes.bool.isRequired,
        canStart: PropTypes.bool.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            selectedWeapon: '',
            error: '',
        };

    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {selectedWeapon} = this.state;
        const {
            applyChoose,
        } = this.props;


        if(!selectedWeapon) {
            this.setState(state => ({error: 'Нужно выбрать предмет'}));
            return false;
        }
        applyChoose(selectedWeapon);
    };

    startNewGame = (e) => {
        e.preventDefault();
        const {startNewGame} = this.props;
        this.setState(state => ({selectedWeapon: ''}));
        startNewGame();
    };

    chooseWeapon = (name) => {
        this.setState(state=> ({selectedWeapon: name}));
    };

    render() {
        const {error, selectedWeapon} = this.state;
        const {gameFinish, canStart} = this.props;

        return (
            <form onSubmit={this.handleSubmit}>
                {error ? <div className="weapons__error">{error}</div> : ''}
                <div className="weapons" >
                    <WeaponItem chooseWeapon={this.chooseWeapon}
                                selectedWeapon={selectedWeapon}
                                name={'rock'}/>
                    <WeaponItem chooseWeapon={this.chooseWeapon}
                                selectedWeapon={selectedWeapon}
                                name={'scissors'}/>
                    <WeaponItem chooseWeapon={this.chooseWeapon}
                                selectedWeapon={selectedWeapon}
                                name={'paper'}/>
                </div>

                <div style={{margin: '50px'}}>
                    {!canStart ? 'Ожидание других игроков' : ''}
                </div>

                {gameFinish ?
                    <button onClick={this.startNewGame} className="weapons__btn">
                        Начать новую игру
                    </button>
                    :
                    <button type="submit" className="weapons__btn" disabled={!canStart}>
                        Подтвердить выбор
                    </button>
                }
            </form>
        )
    }
}

export default Weapons;