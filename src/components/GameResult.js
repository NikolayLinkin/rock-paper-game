import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";


const propTypes = {
    enemyRate: PropTypes.string.isRequired,
    playerRate: PropTypes.string.isRequired,
    gameResult: PropTypes.string.isRequired,
};

const GameResult = ({enemyRate, playerRate, gameResult}) => {
    const resultClass = classNames({
        "result--win": gameResult === "win",
        "result--lose": gameResult === "lose",
    });

    return (
        <div className="room__result">
            <div className="room__result__item">
                <span>Ваш выбор</span>
                <div>
                    {playerRate}
                </div>
            </div>
            <div className="room__result__item">

            </div>
            <div className="room__result__item">
                <span>Выбор противника</span>
                <div>
                    {enemyRate}
                </div>
            </div>

            <div className={resultClass}>
                Итог: {gameResult}
            </div>

        </div>
    )
};

GameResult.propTypes = propTypes;
export default GameResult;