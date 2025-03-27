import React from "react";
import { Link } from "react-router-dom";
import  "../styles/Navbar.css";

const Navbar = () => {
  return (
    <div className="Main-navbar">
    <nav className="navbar">
      <div className="navbar-brand">Pet Adoption Platform</div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/pets">Pets</Link>
        </li>
        <li>
          <Link to="/adopters">Adopters</Link>
        </li>
        <li>
          <Link to="/adopted">Adopted</Link>
        </li>
        <li>
          <Link to="/vets">Vets</Link>
        </li>
        <li>
          <Link to="/shelter">Shelters</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        
      </ul>
    </nav>
    </div>
  );
};

export default Navbar;
