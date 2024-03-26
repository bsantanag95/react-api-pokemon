import PropTypes from "prop-types";
import "../sass/Card.scss";

const Card = ({ name, img, number }) => {
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <div className="card">
      <p className="card__name">
        #{number} - {capitalize(name)}
      </p>
      <div className="card__circle"></div>
      <img className="card__img" src={img} alt="pokemon img" />
    </div>
  );
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};

export { Card };
