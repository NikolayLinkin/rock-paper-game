import React from "react";
import {Link} from "react-router-dom";

const ChooseGameMode = () => {
    return (
        <div className="game-mode__btns">
            <Link to="/pve" className="game-mode__btn game-mode__btn--pve"/>
            <Link to="/pvp" className="game-mode__btn game-mode__btn--pvp"/>
        </div>
    );
};

export default ChooseGameMode;