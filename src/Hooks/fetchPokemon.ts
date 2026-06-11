import { useState, useEffect } from "react";

export type PokemonType = {
  id: number;
  name: string;
  image: string;
  height: string;
  weight: string;
};

export default function useFetchPokemon() {
  const [pokemonList, setPokemonList] = useState<PokemonType[]>([]);
  const API_URL = import.meta.env.VITE_API_URL ;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          API_URL
        );

        const data = await res.json();

        const detailedData: PokemonType[] = await Promise.all(
          data.results.map(async (pokemon: { url: string }) => {
            const res = await fetch(pokemon.url);
            const pokemonData = await res.json();

            return {
              id: pokemonData.id,
              name: pokemonData.name,
              image:
                pokemonData.sprites.other["official-artwork"]
                  .front_default,
              height: String(pokemonData.height),
              weight: String(pokemonData.weight),
            };
          })
        );

        setPokemonList(detailedData);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      }
    };

    fetchData();
  }, []);

  return pokemonList;
}