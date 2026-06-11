

export default function CreatePokemon({addPokemon}: {addPokemon: () => void}) {
    return (
        <div className="bg-black text-white h-fit w-fit rounded-lg shadow-md p-4">
            <h3 className="text-xl font-semibold mb-4 text-center">Create New Pokemon</h3>
            
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg w-full" onClick={()=> addPokemon()}>
                Create
            </button>
        </div>
    )
}