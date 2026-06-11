  type PokemonType = {
  id: number;
  name: string;
  image: string;
  height: string;
  weight: string;
}



export default function Card({ pokemon, todelete, toedit }: { pokemon: PokemonType; todelete: (id: number) => void; toedit: (id: number) => void }) {
  return (
    <div className="bg-black text-white h-fit w-fit rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-2">#{pokemon.id}</h3>
      <img src={pokemon.image} alt={pokemon.name} className="w-full h-48 object-cover mb-4" />
      <h2 className="text-xl font-bold mb-2">{pokemon.name}</h2>
      <p className="text-gray-600">Height: {pokemon.height}</p>
      <p className="text-gray-600">Weight: {pokemon.weight}</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg" onClick={() => toedit(pokemon.id)}>
        Edit
      </button>
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg ml-2" onClick={() => todelete(pokemon.id)}>
        Delete
      </button>
    </div>
  );
}