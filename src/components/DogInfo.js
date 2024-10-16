import React, {useState} from "react";



function DogInfo({dog, onUpdated}){
    const [goodDog, setGoodDog] = useState(dog.isGoodDog)

    function handleClick(){
        const isGoodDog = !goodDog
        setGoodDog(isGoodDog)
        const updatedDog = {
            isGoodDog: isGoodDog
        }
        fetch(`http://localhost:3001/pups/${dog.id}`, {
            method: "PATCH",
            headers:{"Content-Type": "application/json"}, 
            body: JSON.stringify(updatedDog)
        })
        .then(r=>r.json())
        .then(dog=> onUpdated(dog))
    }

    return(
        <div id="dog-info">
            <img src={dog.image} alt={dog.name} />
                <h2>{dog.name}</h2>
            <button onClick={handleClick}>{goodDog ? "Good Dog!" : "Bad Dog"}</button>
        </div>
    )
}

export default DogInfo