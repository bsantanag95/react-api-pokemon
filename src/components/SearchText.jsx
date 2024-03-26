import PropTypes from "prop-types";
import { useState } from "react";
import "../sass/Search.scss";
import swal from "sweetalert";

const SearchText = ({ onNumberChange }) => {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  async function handleSearchClick() {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${searchText.toLowerCase()}/`
    );
    if (!response.ok) {
      swal({
        title: "ERROR",
        text: "Pokémon no encontrado",
        icon: "error",
        button: "Aceptar",
      });
    } else {
      const data = await response.json();
      onNumberChange(data.id);
      setSearchText("");
    }
  }
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Pokemon o N° Pokedex..."
        value={searchText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="search__input"
      />
      <button onClick={handleSearchClick} className="search__button">
        Buscar
      </button>
    </div>
  );
};

SearchText.propTypes = {
  onNumberChange: PropTypes.func.isRequired,
};

export { SearchText };
