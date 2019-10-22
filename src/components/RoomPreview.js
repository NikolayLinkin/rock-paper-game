import React from "react";
import PropTypes from "prop-types";

const propTypes = {
    name: PropTypes.string.isRequired,
    playersCount: PropTypes.number,
};

const RoomPreview = ({name}) => {

    return (
        <div className="room-preview">
            {name}
        </div>
    )
};

RoomPreview.propTypes = propTypes;
export default RoomPreview;