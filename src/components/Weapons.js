import React, {Component} from "react";
import PropTypes from "prop-types";

import WeaponItem from "./WeaponsItem";

class Weapons extends Component {
    static propTypes = {
        applyChoose: PropTypes.func.isRequired,
        startNewGame: PropTypes.func.isRequired,
        gameFinish: PropTypes.bool.isRequired,
        canStart: PropTypes.bool.isRequired,
    };

    constructor(props) {
        super(props);

        this.timer = null;

        this.state = {
            selectedWeapon: '',
            time: 30,
            timerStarted: false,
            error: '',
        };
    }

    componentDidMount() {
        if (this.props.canStart && !this.state.timerStarted) {
            this.startTimer();
        }
    }

    componentDidUpdate() {
        const {canStart, applyChoose, gameFinish} = this.props;
        const {time, timerStarted} = this.state;

        if (canStart && !timerStarted) {
            this.startTimer();
        }

        if (time === 0) {
            this.stopTimer();

            const rates = ['rock', 'paper', 'scissors'];
            const rate = rates[Math.floor(Math.random() * 3)];
            applyChoose(rate);
        }
    }

    componentWillUnmount() {
        this.stopTimer();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {selectedWeapon} = this.state;
        const {
            applyChoose,
        } = this.props;


        if (!selectedWeapon) {
            this.setState(state => ({error: 'Нужно выбрать предмет'}));
            return false;
        }
        this.stopTimer();
        applyChoose(selectedWeapon);
    };

    startTimer = () => {
        this.timer = setInterval(() => this.setState({
            time: this.state.time - 1
        }), 1000);

        this.setState(state => ({timerStarted: true}));
    };

    resetTimer = () => {
        this.setState(state => ({
            timerStarted: false,
            time: 30,
        }))
    };

    stopTimer = () => {
        clearInterval(this.timer);
        this.setState(state => ({time: 30}))
    };

    startNewGame = (e) => {
        e.preventDefault();
        const {startNewGame} = this.props;
        this.setState(state => ({selectedWeapon: ''}));
        this.resetTimer();
        startNewGame();
    };

    chooseWeapon = (name) => {
        this.setState(state => ({selectedWeapon: name}));
    };

    render() {
        const {
            error,
            selectedWeapon,
            time,
        } = this.state;
        const {gameFinish, canStart} = this.props;

        return (
            <form onSubmit={this.handleSubmit}>
                {error ? <div className="weapons__error">{error}</div> : ''}
                <div className="weapons">
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
                    {!canStart ? 'Ожидание других игроков' :
                        <div className="timer">
                            Остаток времени на выбор: {time}
                        </div>
                    }
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