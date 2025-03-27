import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/AdopterProfile.css";
import adopt1 from "../assets/adopt1.jpg";
import adopt2 from "../assets/adopt2.jpg";
import adopt3 from "../assets/adopt3.jpg";
import adopt4 from "../assets/adopt4.jpg";
import adopt5 from "../assets/adopt5.jpg";
import adopt6 from "../assets/adopt6.jpg";
import adopt7 from "../assets/adopt7.jpg";
import adopt8 from "../assets/adopt8.jpg";

const adoptersData = [
  { id: 1, name: "Alice Smith", location: "Kigali, Rwanda", status: "Approved", image: adopt1, contact: "Alice.Smith@gmail.com", about: "John is a passionate animal lover with experience caring for dogs and cats." },
  { id: 2, name: "Jane Smith", location: "Kigali, Rwanda", status: "Pending", image: adopt2, contact: "jane.smith@gmail.com", about: "Jane has fostered animals for over 5 years and loves helping abandoned pets find homes." },
  { id: 3, name: "Brown Johnson", location: "Kigali, Rwanda", status: "Approved", image: adopt3, contact: "Brown.johnson@gmail.com", about: "Alice volunteers at animal shelters and has a special bond with rescue dogs." },
  { id: 4, name: "Bob Brown", location: "Kigali, Rwanda", status: "Rejected", image: adopt4, contact: "bob.brown@gmail.com", about: "Bob has cared for multiple rescued cats and enjoys rehabilitating injured animals." },
  { id: 5, name: "Charlie Davis", location: "Kigali, Rwanda", status: "Approved", image: adopt5, contact: "charlie.davis@gmail.com", about: "Charlie is an experienced dog trainer who specializes in helping adopted pets adjust to their new homes." },
  { id: 6, name: "Eve Wilson", location: "Kigali, Rwanda", status: "Pending", image: adopt6, contact: "eve.wilson@gmail.com", about: "Eve is a vet assistant with expertise in pet nutrition and health." },
  { id: 7, name: "Eve Paris", location: "Kigali, Rwanda", status: "Pending", image: adopt7, contact: "eve.christine@gmail.com", about: "Eve has raised multiple adopted pets and advocates for responsible pet ownership." },
  { id: 8, name: "Edson Maxime", location: "Kigali, Rwanda", status: "Pending", image: adopt8, contact: "edson.maxime@gmail.com", about: "Edson runs a pet-friendly community initiative that promotes pet adoption." },
];

const AdopterProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const adopter = adoptersData.find((a) => a.id === parseInt(id));

  if (!adopter) {
    return <h2>Adopter Not Found</h2>;
  }

  return (
    <div className="adopter-profile-container">
      <h1>{adopter.name}'s Profile</h1>
      <img src={adopter.image} alt={adopter.name} className="profile-image" />
      <p><strong>Location:</strong> {adopter.location}</p>
      <p><strong>Status:</strong> {adopter.status}</p>
      <p><strong>Contact:</strong> {adopter.contact}</p>
      <p><strong>About:</strong> {adopter.about}</p>

      {/* Go Back Button */}
      <button className="btn-go-back" onClick={() => navigate("/adopters")}>
        Go Back
      </button>
    </div>
  );
};

export default AdopterProfile;
