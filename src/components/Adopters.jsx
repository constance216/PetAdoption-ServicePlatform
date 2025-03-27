import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/Adopters.css";
import adopt1 from "../assets/adopt1.jpg";
import adopt2 from "../assets/adopt2.jpg";
import adopt3 from "../assets/adopt3.jpg";
import adopt4 from "../assets/adopt4.jpg";
import adopt5 from "../assets/adopt5.jpg";
import adopt6 from "../assets/adopt6.jpg";
import adopt7 from "../assets/adopt7.jpg";
import adopt8 from "../assets/adopt8.jpg";

// Sample data for adopters
const adoptersData = [
  { id: 1, name: "Alice Smith", location: "Kigali, Rwanda", status: "Approved", image: adopt1 },
  { id: 2, name: "Jane Smith", location: "Kigali, Rwanda", status: "Pending", image: adopt2 },
  { id: 3, name: "Brown Johnson", location: "Kigali, Rwanda", status: "Approved", image: adopt3 },
  { id: 4, name: "Bob Brown", location: "Kigali, Rwanda", status: "Rejected", image: adopt4 },
  { id: 5, name: "Charlie Davis", location: "Kigali, Rwanda", status: "Approved", image: adopt5 },
  { id: 6, name: "Eve Wilson", location: "Kigali, Rwanda", status: "Pending", image: adopt6 },
  { id: 7, name: "Eve Paris", location: "Kigali, Rwanda", status: "Pending", image: adopt7 },
  { id: 8, name: "Edson Maxime", location: "Kigali, Rwanda", status: "Pending", image: adopt8 },
];

const Adopters = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const navigate = useNavigate();

  // Filter adopters
  const filteredAdopters = adoptersData.filter((adopter) => {
    const matchesSearch =
      adopter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      adopter.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "All" || adopter.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="adopters-container">
      <h1>Adopters</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filter Options */}
      <div className="filter-options">
        <label>
          Filter by Status:
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="All">All</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
        </label>
      </div>

      {/* Adopter Cards */}
      <div className="adopters-grid">
        {filteredAdopters.map((adopter) => (
          <div key={adopter.id} className="adopter-card">
            <img src={adopter.image} alt={adopter.name} />
            <h3>{adopter.name}</h3>
            <p><strong>Location:</strong> {adopter.location}</p>
            <p><strong>Status:</strong> {adopter.status}</p>
            <button
              className="btn-view-profile"
              onClick={() => navigate(`/adopters/${adopter.id}`)} // Navigate to individual profile
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Adopters;
