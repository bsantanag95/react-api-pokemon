//Hooks
import { useContext, useState, useEffect } from "react";
// Components
import Button from "./components/Button";
import { Card } from "./components/Card";
import { SearchText } from "./components/SearchText";
import { PokemonContextProvider } from "./Contexts/PokemonContextProvider";
import { PokemonContext } from "./Contexts/PokemonContextProvider";
import { Modal } from "./components/Modal";
import Switch from "./components/Switch";
//Styles
import "./sass/App.scss";
import "./sass/Modal.scss";
//Icons
import { TiArrowLeftOutline } from "react-icons/ti";
import { TiArrowRightOutline } from "react-icons/ti";
import { GrPowerReset } from "react-icons/gr";

const App = () => {
  return (
    <PokemonContextProvider>
      <AppContent />
    </PokemonContextProvider>
  );
};

const AppContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShiny, setIsShiny] = useState(false);
  const [lastPokemon, setLastPokemon] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleShiny = () => {
    setIsShiny((prevIsShiny) => !prevIsShiny);
  };

  const {
    pokemonNumber,
    setPokemonNumber,
    pokemonName,
    pokemonImg,
    pokemonType,
    pokemonType2,
    backgroundColor,
    shinyImg,
    typeColors,
  } = useContext(PokemonContext);

  useEffect(() => {
    const fetchLastPokemon = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
      const data = await response.json();
      setLastPokemon(data.count - 277);
    };

    fetchLastPokemon();
  }, []);

  async function prevClick() {
    pokemonNumber === 1
      ? setPokemonNumber(lastPokemon)
      : setPokemonNumber(pokemonNumber - 1);
  }
  async function nextClick() {
    pokemonNumber === lastPokemon
      ? setPokemonNumber(1)
      : setPokemonNumber(pokemonNumber + 1);
  }
  return (
    <div className="app" style={{ backgroundColor }}>
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          backgroundColor: "lightgray",
          padding: "8px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <span>{isShiny ? "Normal" : "Shiny"}</span>
        <Switch isOn={isShiny} handleToggle={toggleShiny} />
      </div>
      <div className="card-container" onClick={openModal}>
        <Card
          name={pokemonName}
          img={isShiny ? shinyImg : pokemonImg}
          number={pokemonNumber}
        />
      </div>
      <div className="buttons-container">
        <Button icon={<TiArrowLeftOutline />} handleClick={prevClick} />
        <Button
          icon={<GrPowerReset />}
          handleClick={() => setPokemonNumber(1)}
        />
        <Button icon={<TiArrowRightOutline />} handleClick={nextClick} />
      </div>
      <div className="search-container">
        <SearchText onNumberChange={setPokemonNumber} />
      </div>
      {isModalOpen && (
        <Modal
          name={pokemonName}
          number={pokemonNumber}
          type={pokemonType}
          type2={pokemonType2}
          typeColors={typeColors}
          onClose={closeModal}
        >
          <img src={isShiny ? shinyImg : pokemonImg} alt={pokemonName} />
        </Modal>
      )}
    </div>
  );
};

export { App };
