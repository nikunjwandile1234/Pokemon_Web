import { useEffect, useState } from "react";
import useFetchPokemon from "./Hooks/fetchPokemon";
import Card from "./components/card";
import CreatePokemon from "./components/createPokemoncard";
import { useNavigate } from "react-router-dom";

export type PokemonType = {
  id: number;
  name: string;
  image: string;
  height: string;
  weight: string;
};

function App() {
  const fetchedPokemon = useFetchPokemon();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);


  const [PArray, setPArray] = useState<PokemonType[]>(() => {
    const saved = localStorage.getItem("pokemon");
    return saved ? JSON.parse(saved) : [];
  });


  useEffect(() => {
    if (fetchedPokemon.length > 0 || PArray.length > 0) {
      setLoading(false);
    }
  }, [fetchedPokemon, PArray]);

  useEffect(() => {
    const saved = localStorage.getItem("pokemon");
    if (!saved && fetchedPokemon.length > 0) {
      setPArray(fetchedPokemon);
      localStorage.setItem("pokemon", JSON.stringify(fetchedPokemon));
    }
  }, [fetchedPokemon]);


  useEffect(() => {
    if (PArray.length > 0) {
      localStorage.setItem("pokemon", JSON.stringify(PArray));
    }
  }, [PArray]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  function todelete(id: number) {
    const confirmed = window.confirm("Are you sure you want to delete this pokemon?");
    if (confirmed) {
      const updated = PArray.filter((pokemon) => pokemon.id !== id);
      setPArray(updated);
    
      if (updated.length === 0) {
        localStorage.removeItem("pokemon");
      } else {
        localStorage.setItem("pokemon", JSON.stringify(updated));
      }
    }
  }

  function toedit(id: number) {
    const newName = prompt("Enter new name:");
    const newHeight = prompt("Enter new height:");
    const newWeight = prompt("Enter new weight:");

    setPArray((prev) =>
      prev.map((pokemon) => {
        if (pokemon.id === id) {
          return {
            ...pokemon,
            name: newName || pokemon.name,
            height: newHeight || pokemon.height,
            weight: newWeight || pokemon.weight,
          };
        }
        return pokemon;
      })
    );
  }

  function handleNavigateToCreate() {
    navigate("/create");
  }

  return (
    <div className="container  bg-gray-900 mx-auto p-4">
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {PArray.map((pokemon: PokemonType) => (
          <Card key={pokemon.id} pokemon={pokemon} todelete={todelete} toedit={toedit} />
        ))}
        <CreatePokemon addPokemon={handleNavigateToCreate} />
      </section>
    </div>
  );
}

export default App;