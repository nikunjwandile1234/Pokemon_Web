
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePokemon() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [image, setImage] = useState("");

    function handleSubmit() {
        if (!name || !height || !weight) {
            alert("Please fill in Name, Height, and Weight fields!");
            return;
        }

       
        const saved = localStorage.getItem("pokemon");
        const currentList = saved ? JSON.parse(saved) : [];
        const newId = currentList.length > 0 ? Math.max(...currentList.map((p: any) => p.id)) + 1 : 1;

        const newPokemon = {
            id: newId,
            name: name,
            height: height,
            weight: weight,
            image: image ,
        };

       
        localStorage.setItem("pokemon", JSON.stringify([...currentList, newPokemon]));

 

       
        navigate("/");
    }

    return (
        <div className="bg-white text-blackh-fit w-full max-w-md rounded-lg shadow-md p-6 mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-center">Create New Pokemon</h3>
            
            <label className="block text-sm mb-1 ">Name</label>
            <input 
                 className="w-full p-2 mb-3 rounded-lg text-black hover:border hover: border-black focus:outline-none"
                type="text" 
                placeholder="e.g. Pikachu" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                
            />

            <label className="block text-sm mb-1 ">Height</label>
            <input 
                className="w-full p-2 mb-3 rounded-lg text-black hover:border hover: border-black focus:outline-none"
                type="text" 
                placeholder="e.g. 4" 
                value={height}
                onChange={(e) => setHeight(e.target.value)}
               
            />

            <label className="block text-sm mb-1 ">Weight</label>
            <input 
                className="w-full p-2 mb-3 rounded-lg text-black hover:border hover: border-black focus:outline-none"
                type="text" 
                placeholder="e.g. 60" 
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
            
            />

            <label className="block text-sm mb-1 ">Image URL</label>
            <input 
                className="w-full p-2 mb-3 rounded-lg text-black hover:border hover: border-black focus:outline-none"
                type="text" 
                placeholder="https://..." 
                value={image}
                onChange={(e) => setImage(e.target.value)}
               
            />

            <button 
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg w-full transition-colors" 
                onClick={handleSubmit}
            >
                Create
            </button>
        </div>
    )
}