import React, {Component} from "react";
import classNames from "classnames";

import GameInfo from "./GameInfo";

class Weapons extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedWeapon: '',
        };

    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {selectedWeapon} = this.state;
        const {startGame} = this.props;
        if(!selectedWeapon) {
            console.warn('Нужно выбрать!');
            return false;
        }
        startGame(selectedWeapon);

    };

    chooseWeapon = (name) => {
        this.setState(state=> ({selectedWeapon: name}));

    };

    render() {
        const {
            gameResult,
            gameHistory,
            gameFinish,
            aiRate,
        } = this.props;
        const {selectedWeapon} = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="weapons" >
                    <label className="weapons__item">
                        <input className="weapons__item__inp"
                               onChange={() => this.chooseWeapon('rock')}
                               type="radio" name="weapon" hidden/>
                        <span className="weapons__item__span"/>
                        Камень
                    </label>
                    <label className="weapons__item">
                        <input className="weapons__item__inp"
                               type="radio"
                               onChange={() => this.chooseWeapon('scissors')}
                               name="weapon" hidden/>
                        <span className="weapons__item__span"/>
                        Н
                    </label>
                    <label className="weapons__item">
                        <input className="weapons__item__inp"
                               type="radio"
                               onChange={() => this.chooseWeapon('paper')}
                               name="weapon" hidden/>
                        <span className="weapons__item__span"/>
                        Б
                    </label>
                </div>
                <button type="submit" className="weapons__btn">
                    Играть
                </button>

                {/*{JSON.stringify(gameHistory)}*/}

                {gameFinish ?
                    <GameInfo aiRate={aiRate}
                              gameResult={gameResult}
                              playerRate={selectedWeapon}
                    /> : ""}
            </form>
        )
    }
}

export default Weapons;