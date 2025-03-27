import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Vets.css";
import vet1 from "../assets/vet1.jpg";
import vet2 from "../assets/vet2.jpg";
import vet3 from "../assets/vet3.jpg";
import vet4 from "../assets/vet4.jpg";
import vet5 from "../assets/vet5.jpg";
import vet6 from "../assets/vet6.jpg";

const vetsData = [
  {
    id: 1,
    name: "Dr. Annick Ujeneza",
    specialization: "General Practice",
    location: "Kicukiro, Rwanda",
    contact: "Annick.uje@gmail.com",
    services: ["Checkups", "Vaccinations", "Minor Surgeries"],
    image: vet1,
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    specialization: "Surgery",
    location: "Gasabo, Rwanda",
    contact: "jane.smith@gmail.com",
    services: ["Orthopedic Surgery", "Dental Surgery", "Emergency Care"],
    image: vet2,
  },
  {
    id: 3,
    name: "Dr. Alice Johnson",
    specialization: "Dermatology",
    location: "Kicukiro, Rwanda",
    contact: "alice.johnson@gmail.com",
    services: ["Skin Treatments", "Allergy Testing", "Wound Care"],
    image: vet3,
  },
  {
    id: 4,
    name: "Dr. sandrine Brown",
    specialization: "Orthopedics",
    location: "Nyarugenge, Rwanda",
    contact: "sandrine.brown@gmail.com",
    services: ["Fracture Repair", "Joint Surgery", "Physical Therapy"],
    image: vet4,
  },
  {
    id: 5,
    name: "Dr. Charlie Davis",
    specialization: "Cardiology",
    location: "Nyarugenge, Rwanda",
    contact: "charlie.davis@gmail.com",
    services: ["Heart Checkups", "Echocardiograms", "Cardiac Surgery"],
    image: vet5,
  },
  {
    id: 6,
    name: "Dr. Eve Wilson",
    specialization: "Dentistry",
    location: "Gasabo, Rwanda",
    contact: "eve.wilson@gmail.com",
    services: ["Teeth Cleaning", "Tooth Extractions", "Oral Surgery"],
    image: vet6,
  },
];

const Vets = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLocation, setFilterLocation] = useState("All");
  const [expandedCard, setExpandedCard] = useState(null);
  const navigate = useNavigate();

  const filteredVets = vetsData.filter((vet) => {
    const matchesSearch =
      vet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vet.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterLocation === "All" || vet.location === filterLocation;
    return matchesSearch && matchesFilter;
  });

  const handleViewProfile = (id) => {
    navigate(`/vets/${id}`);
  };

  return (
    <div className="vets-container">
      <h1>Veterinarians</h1>

      <div className="search-filter">
        <input
          type="text"
          placeholder="Search by name or specialization..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)}>
          <option value="All">All Locations</option>
          {Array.from(new Set(vetsData.map((vet) => vet.location))).map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      <div className="vets-list">
        {filteredVets.map((vet) => (
          <div key={vet.id} className="vet-card">
            <div className="vet-image-container">
              <img src={vet.image} alt={vet.name} className="vet-image" />
            </div>
            <div className="vet-info">
              <h3>{vet.name}</h3>
              <p>{vet.specialization}</p>
              <p className="location">{vet.location}</p>
              {/* <button className="btn-view-profile" onClick={() => handleViewProfile(vet.id)}>
                View Profile
              </button> */}
              <button
                className="btn-toggle-details"
                onClick={() => setExpandedCard(expandedCard === vet.id ? null : vet.id)}
              >
                {expandedCard === vet.id ? "Hide Details" : "Show Details"}
              </button>
              {expandedCard === vet.id && (
                <div className="vet-details">
                  <p>{vet.contact}</p>
                  <p>{vet.services.join(", ")}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vets;
