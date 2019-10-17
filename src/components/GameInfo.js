import React from "react";

const GameInfo = ({aiRate, playerRate, gameResult}) => {
    return (
        <div>
            Результаты прошлой игры:<br/>
            {playerRate} VS {aiRate} = {gameResult}
        </div>
    )
};

export default GameInfo;