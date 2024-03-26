//import React from 'react'
import PropTypes from "prop-types";
import "../sass/Button.scss";

const Button = ({ icon, handleClick }) => {
  return (
    <div className="button__box">
      <button className="button" onClick={handleClick}>
        {icon}
      </button>
      <div className="button__shadow"></div>
    </div>
  );
};

Button.propTypes = {
  icon: PropTypes.node.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Button;
