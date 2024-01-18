import React, { useState, useEffect } from "react";

const Pokedex = (props) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPokemons = async () => {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setPokemonList(data.results);
      setLoading(false);
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
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {pokemonList.map((pokemon, index) => {
            const parts = pokemon.url.split('/');
            const pokemonId = parts[parts.length - 2];
            return (
              <li key={index}>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`} alt={pokemon.name} />
                {pokemon.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Pokedex;
