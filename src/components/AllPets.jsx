import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Allpets.css" 
import { Link, useNavigate } from "react-router-dom";
import { Notify } from "notiflix";
const AllPets = () => {
  const theme=""; // Get current theme (true/false)
  const [parkingSpots, setParkingSpots] = useState([]);

  useEffect(() => {
      const fetchParkingSpots = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/petM/list"
          );
          setParkingSpots(response.data.data); // Assuming data is an array of parking spots

        } catch (err) {
          // console.error("Error fetching parking spots:", err);
          Notify.failure(err.message);
        }
    }
    fetchParkingSpots();
  }, []);
  return (
    <div className={`parking-container ${theme}`}>
      {/* {error && <p>{error}</p>} */}
        <div className="parking-list">
          {parkingSpots.map((spot, index) => (
            <div key={index} className="parking-item">
              <div className="parking-image">
                <img src={spot.image.url} alt="Parking Spot" style={{height:"17rem"}} />
              </div>
              <div className="parking-description">
                <h3>{spot.name}</h3>
                <p><strong>Name:</strong> {spot.name}</p>
                <p><strong>Breed:</strong> {spot.breed}</p>
                <p><strong>Description:</strong> {spot.description}</p>
                <p><strong>Age:</strong> {spot.age}</p>
        
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default AllPets;