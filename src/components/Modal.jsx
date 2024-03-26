import PropTypes from "prop-types";
import "../sass/Modal.scss";

export function Modal({
  name,
  number,
  type,
  type2,
  children,
  typeColors,
  onClose,
}) {
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  function generation(number) {
    const generations = [
      { start: 1, end: 151, name: "1ra. generación" },
      { start: 152, end: 251, name: "2da. generación" },
      { start: 252, end: 387, name: "3ra. generación" },
      { start: 388, end: 495, name: "4ta. generación" },
      { start: 496, end: 650, name: "5ta. generación" },
      { start: 651, end: 722, name: "6ta. generación" },
      { start: 723, end: 810, name: "7ma. generación" },
      { start: 811, end: 906, name: "8va. generación" },
      { start: 907, end: 1026, name: "9na. generación" },
    ];

    const generation = generations.find(
      (gen) => number >= gen.start && number <= gen.end
    );

    return generation;
  }

  function getType(type, type2) {
    const translations = {
      normal: "Normal",
      fire: "Fuego",
      water: "Agua",
      electric: "Eléctrico",
      grass: "Planta",
      ice: "Hielo",
      fighting: "Lucha",
      poison: "Veneno",
      ground: "Tierra",
      flying: "Volador",
      psychic: "Psíquico",
      bug: "Bicho",
      rock: "Roca",
      ghost: "Fantasma",
      dark: "Siniestro",
      dragon: "Dragón",
      steel: "Acero",
      fairy: "Hada",
    };

    let pokemonType = "";
    if (type2 != "No existe") {
      pokemonType = `${translations[type]}/${translations[type2]}`;
    } else {
      pokemonType = translations[type];
    }
    return pokemonType;
  }
  function getTypeColor(type) {
    return typeColors[type];
  }
  const typeStyle = {
    backgroundColor: getTypeColor(type),
    padding: "6px 12px",
    color: "white",
    border: "1px solid black",
  };

  return (
    <div className={`modal`}>
      <div onClick={onClose} className="modal-content">
        <div className="modal__content">
          <p className="modal__name">
            #{number} - {capitalize(name)}
          </p>
          <p className="modal__generation">{generation(number).name}</p>
          <p className="modal__type" style={typeStyle}>
            {getType(type, type2)}
          </p>
          <img src={children.props.src} alt={name} className="modal__image" />
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  type2: PropTypes.string.isRequired,
  typeColors: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

// function generation(number) {
//   const ranges = {
//     1: "Primera generación",
//     151: "Segunda generación",
//     252: "Tercera generación",
//     387: "Cuarta generación",
//     495: "Quinta generación",
//     650: "Sexta generación",
//     722: "Séptima generación",
//     810: "Octava generación",
//     906: "Novena generación"
//   };

//   let gen = "";
//   for (const r in ranges) {
//     if (number > r) {
//       gen = ranges[r];
//     }
//   }

//   return gen;
// }
