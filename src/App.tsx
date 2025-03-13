import { useState } from "react";

interface Pokemon {
  name: string;
  sprites: { front_default: string; front_shiny: string };
  types: { type: { name: string } }[];
  stats: { stat: { name: string }; base_stat: number }[];
  abilities: { ability: { name: string }; is_hidden: boolean }[];
}

function App() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [inputNumber, setInputNumber] = useState<string>("");

  // Function to fetch Pokémon by ID
  const fetchPokemon = async (id: string) => {
    if (!id) return;
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data: Pokemon = await response.json();
      
      console.log("Pokémon API Response:", data); // Log the API response for debugging
      
      setPokemon(data);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    }
  };

  // Function to fetch a random Pokémon (1-151 for Gen 1)
  const handleRandomPokemon = () => {
    const randomId = Math.floor(Math.random() * 1025) + 1;
    fetchPokemon(randomId.toString());
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Pokémon Viewer</h1>
      
      {/* Input Field */}
      <input
        type="number"
        placeholder="Enter Pokémon ID"
        value={inputNumber}
        onChange={(e) => setInputNumber(e.target.value)}
      />
      
      {/* Buttons */}
      <button onClick={() => fetchPokemon(inputNumber)}>Search</button>
      <button onClick={handleRandomPokemon}>Random</button>

      {/* Pokémon Display */}
      {pokemon && (
        <div>
          <h2>{pokemon.name.toUpperCase()}</h2>
          
          {/* Normal & Shiny Sprites */}
          <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
            <div>
              <p>Normal</p>
              <img src={pokemon.sprites.front_default} alt={`${pokemon.name} normal`} />
            </div>
            <div>
              <p>Shiny</p>
              <img src={pokemon.sprites.front_shiny} alt={`${pokemon.name} shiny`} />
            </div>
          </div>

          <p><strong>Type:</strong> {pokemon.types.map((t) => t.type.name).join(", ")}</p>

          {/* Pokémon Stats */}
          <h3>Stats</h3>
          <ul style={{ listStyle: "none", padding: 0, textAlign: "left", display: "inline-block" }}>
            {pokemon.stats.map((s, index) => (
              <li key={index}><strong>{s.stat.name}:</strong> {s.base_stat}</li>
            ))}
          </ul>

          {/* Pokémon Abilities */}
          <h3>Abilities</h3>
          <ul style={{ listStyle: "none", padding: 0, textAlign: "left", display: "inline-block" }}>
            {pokemon.abilities.map((a, index) => (
              <li key={index}>
                <strong>{a.ability.name}</strong> {a.is_hidden ? "(Hidden Ability)" : ""}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;




