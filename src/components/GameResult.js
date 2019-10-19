import React from "react";
import PropTypes from "prop-types";


const propTypes = {
    enemyRate: PropTypes.string.isRequired,
    playerRate: PropTypes.string.isRequired,
    gameResult: PropTypes.string.isRequired,
};

const GameResult = ({enemyRate, playerRate, gameResult}) => {
    return (
        <div>
            Результаты прошлой игры:<br/>
            {playerRate} VS {enemyRate} = {gameResult}
        </div>
    )
};

GameResult.propTypes = propTypes;
export default GameResult;