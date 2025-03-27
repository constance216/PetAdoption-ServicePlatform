import React, { useState } from "react";
import "../styles/Adopted.css";
import dog7 from "../assets/dog7.jpg";
import dog8 from "../assets/dog8.jpg";
import dog9 from "../assets/dog9.jpg";
import dog3 from "../assets/dog3.jpg";
import dog2 from "../assets/dog2.jpg";
import dog4 from "../assets/dog4.jpg";
import cat1 from "../assets/cat1.jpg";
import cat2 from "../assets/cat2.jpg";

const adoptedPetsData = [
  { id: 1, name: "Max", breed: "Golden Retriever", type: "Dog", adopter: "Alice Smith", adoptionDate: "2023-10-01", image: dog7 },
  { id: 2, name: "Luna", breed: "Siamese", type: "Cat", adopter: "Jane Smith", adoptionDate: "2023-09-15", image: dog8 },
  { id: 3, name: "Thumper", breed: "Holland Lop", type: "Rabbit", adopter: "Brown Johnson", adoptionDate: "2023-08-20", image: dog9 },
  { id: 4, name: "Buddy", breed: "Labrador", type: "Dog", adopter: "Bob Brown", adoptionDate: "2023-07-10", image: dog3 },
  { id: 5, name: "Milo", breed: "Persian", type: "Cat", adopter: "Charlie Davis", adoptionDate: "2023-06-05", image: dog4 },
  { id: 6, name: "Coco", breed: "Parrot", type: "Bird", adopter: "Eve Wilson", adoptionDate: "2023-05-01", image: dog2 },
  { id: 7, name: "Coco", breed: "Parrot", type: "Bird", adopter: "Eve Paris", adoptionDate: "2023-05-01", image: cat1 },
  { id: 8, name: "Coco", breed: "Parrot", type: "Bird", adopter: "Edson Maxime", adoptionDate: "2023-05-01", image: cat2 },
];

const Adopted = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [selectedPet, setSelectedPet] = useState(null);

  const filteredAdoptedPets = adoptedPetsData.filter((pet) => {
    const matchesSearch =
      pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.adopter.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "All" || pet.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="adopted-container">
      <h1>Adopted Pets</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or adopter..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="filter-options">
        <label>
          Filter by Type:
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="All">All</option>
            <option value="Dog">Dogs</option>
            <option value="Cat">Cats</option>
            <option value="Rabbit">Rabbits</option>
            <option value="Bird">Birds</option>
          </select>
        </label>
      </div>
      <div className="adopted-pets-grid">
        {filteredAdoptedPets.map((pet) => (
          <div key={pet.id} className="adopted-pet-card">
            <img src={pet.image} alt={pet.name} />
            <h3>{pet.name}</h3>
            <p><strong>Breed:</strong> {pet.breed}</p>
            <p><strong>Adopter:</strong> {pet.adopter}</p>
            <p><strong>Adoption Date:</strong> {pet.adoptionDate}</p>
            <button className="btn-view-details" onClick={() => setSelectedPet(pet)}>View Details</button>
          </div>
        ))}
      </div>

      {selectedPet && (
        <div className="details-box-overlay" onClick={() => setSelectedPet(null)}>
          <div className="details-box" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedPet.name}</h2>
            <img src={selectedPet.image} alt={selectedPet.name} />
            <p><strong>Breed:</strong> {selectedPet.breed}</p>
            <p><strong>Type:</strong> {selectedPet.type}</p>
            <p><strong>Adopter:</strong> {selectedPet.adopter}</p>
            <p><strong>Adoption Date:</strong> {selectedPet.adoptionDate}</p>
            <button className="btn-close" onClick={() => setSelectedPet(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Adopted;
