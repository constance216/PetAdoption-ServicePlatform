import React, { useState } from "react";
import "../styles/Pets.css";
import cat1 from "../assets/cat1.jpg";
import cat2 from "../assets/cat2.jpg";
import cat3 from "../assets/cat3.jpg";
import dog1 from "../assets/dog1.jpg";
import dog2 from "../assets/dog2.jpg";
import dog3 from "../assets/dog3.jpg";
import dog4 from "../assets/dog4.jpg"
import dog5 from "../assets/dog5.jpg"




const petsData = [
  { id: 1, name: "Max", breed: "Golden Retriever", type: "Dog", age: "2 years", image: cat1, description: "Friendly and playful dog. Loves outdoor activities." },
  { id: 2, name: "Luna", breed: "Siamese", type: "Cat", age: "1 year", image: cat2, description: "Affectionate and intelligent cat. Great companion." },
  { id: 3, name: "Thumper", breed: "Holland Lop", type: "Rabbit", age: "6 months", image: cat3, description: "Soft and gentle rabbit. Loves to be petted." },
  { id: 4, name: "Buddy", breed: "Labrador", type: "Dog", age: "3 years", image: dog1, description: "Loyal and energetic. Great for families." },
  { id: 5, name: "Milo", breed: "Persian", type: "Dog", age: "2 years", image: dog2, description: "Calm and loving cat. Enjoys cuddles." },
  { id: 6, name: "Coco", breed: "Parrot", type: "Dog", age: "1 year", image: dog3, description: "Talkative and colorful. Can mimic words." },
  { id: 6, name: "Jini", breed: "Parrot", type: "Dog", age: "1 year", image: dog4, description: "Talkative and colorful. Can mimic words." },
  { id: 6, name: "Pawl", breed: "Parrot", type: "Dog", age: "1 year", image: dog5, description: "Talkative and colorful. Can mimic words." },
];

const Pets = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [selectedPet, setSelectedPet] = useState(null);

  const filteredPets = petsData.filter((pet) => {
    const matchesSearch = pet.name.toLowerCase().includes(searchQuery.toLowerCase()) || pet.breed.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "All" || pet.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="pets-container">
      <h1>Available Pets</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search by name or breed..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>

      {/* Filter Options */}
      <div className="filter-options">
        <label>
          Filter by Type:
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="All">All</option>
            <option value="Dog">Dogs</option>
            <option value="Cat">Cats</option>
          </select>
        </label>
      </div>

      {/* Pet Cards */}
      <div className="pets-grid">
        {filteredPets.map((pet) => (
          <div key={pet.id} className="pet-card">
            <img src={pet.image} alt={pet.name} />
            <h3>{pet.name}</h3>
            <p><strong>Breed:</strong> {pet.breed}</p>
            <p><strong>Type:</strong> {pet.type}</p>
            <p><strong>Age:</strong> {pet.age}</p>
            <button className="btn-view-details" onClick={() => setSelectedPet(pet)}>View Details</button>
          </div>
        ))}
      </div>

      {/* Pet Details Box */}
      {selectedPet && (
        <div className="details-box-overlay" onClick={() => setSelectedPet(null)}>
          <div className="details-box" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedPet.name}</h2>
            <img src={selectedPet.image} alt={selectedPet.name} />
            <p><strong>Breed:</strong> {selectedPet.breed}</p>
            <p><strong>Type:</strong> {selectedPet.type}</p>
            <p><strong>Age:</strong> {selectedPet.age}</p>
            <p><strong>Description:</strong> {selectedPet.description}</p>
            <button className="btn-close" onClick={() => setSelectedPet(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pets;
