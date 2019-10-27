import React from "react";
import PropTypes from "prop-types";

const propTypes = {
    name: PropTypes.string.isRequired,
    chooseWeapon: PropTypes.func.isRequired,
};

const WeaponItem = ({name, chooseWeapon, selectedWeapon}) => {

    return (
        <label className="weapons__item">
            <input className="weapons__item__inp"
                   checked={selectedWeapon===name}
                   onChange={() => chooseWeapon(name)}
                   type="radio" name="weapon" hidden/>
            <span className={`weapons__item__span weapons__item__span--${name}`}/>
            {name}
        </label>
    )
};

WeaponItem.propTypes = propTypes;
export default WeaponItem;