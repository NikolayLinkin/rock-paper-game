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
        "result__finish": true,
        "result__finish--win": gameResult === "win",
        "result__finish--lose": gameResult === "lose",
        "result__finish--draw": gameResult === "draw",
    });

    return (
        <div className="result">
            <div className="result__items">
                <div className="result__item">
                    <span>Ваш выбор:</span>
                    <div className={`result__item__ico result__item__ico--${playerRate}`}/>
                </div>
                <div className="result__item--vs">
                    VS
                </div>
                <div className="result__item">
                    <span>Выбор противника:</span>
                    <div className={`result__item__ico result__item__ico--${enemyRate}`}/>
                </div>
            </div>
            <div className={resultClass}>
                {gameResult !== "draw" ? "You:" : ""} {gameResult}
            </div>
        </div>
    )
};

GameResult.propTypes = propTypes;
export default GameResult;