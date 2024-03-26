import { createContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

export const PokemonContext = createContext();

export const PokemonContextProvider = ({ children }) => {
  const [pokemonNumber, setPokemonNumber] = useState(1);
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonImg, setPokemonImg] = useState("");
  const [pokemonType, setPokemonType] = useState("");
  const [pokemonType2, setPokemonType2] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [shinyImg, setShiny] = useState("");

  async function getPokemonData(id) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      const data = await response.json();
      setPokemonName(data.name);
      setPokemonImg(data.sprites.other["official-artwork"].front_default);
      setPokemonType(data.types[0].type.name);
      setPokemonType2(data.types[1] ? data.types[1].type.name : "No existe");
      setShiny(data.sprites.other["official-artwork"].front_shiny);
    } catch (err) {
      alert(err);
    }
  }
  const typeColors = useMemo(
    () => ({
      bug: "#86B32D",
      dark: "#8F8F8F",
      dragon: "#916ED9",
      electric: "#E6C100",
      fairy: "#E79FE7",
      fighting: "#E65F5F",
      fire: "#D96C00",
      flying: "#a99be6",
      ghost: "#637180",
      grass: "#82D957",
      ground: "#C4A377",
      ice: "#A3CCD9",
      normal: "#C4B597",
      poison: "#9A75E6",
      psychic: "#E6A3B1",
      rock: "#B37437",
      steel: "#B3B3B3",
      water: "#9ECBE6",
    }),
    []
  );

  useEffect(() => {
    getPokemonData(pokemonNumber);
  }, [pokemonNumber]);

  useEffect(() => {
    setBackgroundColor(typeColors[pokemonType]);
  }, [pokemonType, typeColors]);

  return (
    <PokemonContext.Provider
      value={{
        pokemonNumber,
        setPokemonNumber,
        pokemonName,
        setPokemonName,
        pokemonImg,
        pokemonType,
        pokemonType2,
        backgroundColor,
        shinyImg,
        typeColors,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

PokemonContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
