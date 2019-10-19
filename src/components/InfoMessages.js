import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  message: PropTypes.string.isRequired,
  color: PropTypes.string,
};


const InfoMessage = ({message, color="red"}) => {
    return (
        <div style={{color}}>
            {message}
        </div>
    )
};

export default InfoMessage;