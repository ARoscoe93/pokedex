import React, { useState, useEffect } from "react";

const Pokedex = (props) => {
  const [pokemonList, setPokemonList] = useState([]);

  const fetchPokemons = async () => {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon");
      const data = await response.json();
      setPokemonList(data.results);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
  <div className="pokedex">
    <h2>All Pokemon</h2>
    <ul>
      {pokemonList.map(pokemon => {
        const parts = pokemon.url.split('/');
        const pokemonId = parts[parts.length - 2];
        return (
          <li key={pokemonId}>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`} alt={pokemon.name} />
            {pokemon.name}
          </li>
        );
      })}
    </ul>
  </div>
);
};

export default Pokedex;
