import React, {useState,useEffect} from "react";
import DogInfo from "./DogInfo";
function App() {
  const[dogs, setDogs]= useState([]);
  const [origianlDogs, setOrginalDogs] =  useState([])
  const [selectedDog,setSelectedDog] = useState({})
  const[filterButton, setFilterButton] = useState(false)
  useEffect(()=>{
    fetch("http://localhost:3001/pups")
    .then(r=>r.json())
    .then(dogs =>{
      setDogs(dogs) 
      setOrginalDogs(dogs)
  })
  },[])
  function diplayDog(selected){
   const updatedDogs = dogs.map((dog)=>{
    if(dog.id === selected.id){
      return selected
    }
    else{return dog}
   })
   selectedDog(updatedDogs)
   setOrginalDogs(updatedDogs)
  }
  function onFilterButton(){
    const isFilter = !filterButton
    setFilterButton(isFilter)
    if(isFilter){
      const filteredDogs = dogs.filter(dog => dog.isGoodDog === true);
      setDogs(filteredDogs)
    }
    else{
      setDogs(origianlDogs)
    }
  
  }

  return (
    <div className="App">
      <div id="filter-div">
        <button onClick={onFilterButton} id="good-dog-filter">{!filterButton?"Filter good dogs: OFF" : "Filter good dogs: ON"}</button>
      </div>
      <div id="dog-bar">{dogs.map((dog)=> <span onClick={()=> setSelectedDog(dog)} key={dog.id}>{dog.name}</span>)}</div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <DogInfo onUpdated ={diplayDog} key={selectedDog.id} dog={selectedDog}
        />
      </div>
    </div>
  );
}

export default App;
