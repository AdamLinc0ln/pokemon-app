import React, { useState } from 'react';
import PokemonSearch from './components/PokemonSearch';
import { Pokemon } from './types';

const App: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [inputNumber, setInputNumber] = useState<string>('');

  const fetchPokemon = async (id: string) => {
    if (!id) return;
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data: Pokemon = await response.json();
      console.log(data); // Log the entire response data
      setPokemon(data);
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
    }
  };

  const handleRandomPokemon = () => {
    const randomId = Math.floor(Math.random() * 1025) + 1;
    fetchPokemon(randomId.toString());
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Pokémon Viewer</h1>
      <PokemonSearch
        fetchPokemon={fetchPokemon}
        handleRandomPokemon={handleRandomPokemon}
        pokemon={pokemon}
        inputNumber={inputNumber}
        setInputNumber={setInputNumber}
      />
    </div>
  );
};

export default App;

