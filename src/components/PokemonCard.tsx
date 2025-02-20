import React from 'react';
import { Pokemon } from '../types';

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => (
  <div>
    <h2>{pokemon.name.toUpperCase()}</h2>
    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    <p>Type: {pokemon.types.map((t) => t.type.name).join(', ')}</p>
    {pokemon.stats.map((stat) => (
      <p key={stat.stat.name}>
        {stat.stat.name.toUpperCase()}: {stat.base_stat}
      </p>
    ))}
  </div>
);

export default PokemonCard;


