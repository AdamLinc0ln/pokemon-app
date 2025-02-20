import PokemonCard from './PokemonCard';
import { Pokemon } from '../types';

interface PokemonSearchProps {
  fetchPokemon: (id: string) => void;
  handleRandomPokemon: () => void;
  pokemon: Pokemon | null;
  inputNumber: string;
  setInputNumber: React.Dispatch<React.SetStateAction<string>>;
}

const PokemonSearch: React.FC<PokemonSearchProps> = ({
  fetchPokemon,
  handleRandomPokemon,
  pokemon,
  inputNumber,
  setInputNumber,
}) => (
  <div>
    <input
      type="number"
      placeholder="Enter Pokémon ID"
      value={inputNumber}
      onChange={(e) => setInputNumber(e.target.value)}
    />
    <button onClick={() => fetchPokemon(inputNumber)}>Search</button>
    <button onClick={handleRandomPokemon}>Random</button>

    {pokemon && <PokemonCard pokemon={pokemon} />}
  </div>
);

export default PokemonSearch;