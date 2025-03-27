import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/Home.css";
import pet1 from "../assets/pet1.jpg"
import pet2 from "../assets/pet2.jpg"
import pet4 from "../assets/pet4.png"
import cat1 from "../assets/cat1.jpg"
import cat2 from "../assets/cat2.jpg"
import cat3 from "../assets/cat3.jpg"
import cat4 from "../assets/cat4.jpg"
import dog1 from "../assets/dog1.jpg"
import Testimonial from "./testimony";
import About from "./About";

const Home = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleGetStarted = () => {
    navigate("/pets"); // Navigate to the Pets Page
  };

  return (
    <div>
    <div className="home-container1">
      {/* Hero Section */}
      <div className="hero">
        <h1>Find Your Perfect Pet Companion Today!</h1>
        <p>Browse through our selection of adorable pets looking for a loving home.</p>
        <button className="btn-primary" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
      {/* About Us */}
      <About/>

      {/* Featured Pets */}
      <section className="featured-pets">
        <h2>Featured Pets</h2>
        <div className="pets-grid">
          <div className="pet-card">
            <img src={pet1} alt="Max" />
            <h3>Max</h3>
            <p>Playful Golden Retriever</p>
          </div>
          <div className="pet-card">
            <img src={pet2} alt="Luna" />
            <h3>Luna</h3>
            <p>Sweet and Curious Cat</p>
          </div>
          <div className="pet-card">
            <img src={pet4} alt="Thumper" />
            <h3>Thumper</h3>
            <p>Cute and Fluffy Rabbit</p>
          </div>

          <div className="pet-card">
            <img src={cat1} alt="Flex" />
            <h3>Flex</h3>
            <p>Playful Golden Retriever</p>
          </div>
          <div className="pet-card">
            <img src={cat2} alt="Bumpy" />
            <h3>Bumpy</h3>
            <p>Sweet and Curious Cat</p>
          </div>
          <div className="pet-card">
            <img src={cat3} alt="puppy" />
            <h3>puppy</h3>
            <p>Cute and Fluffy Rabbit</p>
          </div>
          <div className="pet-card">
            <img src={cat4} alt="puppy" />
            <h3>kox</h3>
            <p>Cute and Fluffy Rabbit</p>
          </div>
          <div className="pet-card">
            <img src={dog1} alt="puppy" />
            <h3>Jack</h3>
            <p>Cute and Fluffy Rabbit</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <ol>
          <li>Browse available pets.</li>
          <li>Apply for adoption.</li>
          <li>Meet your new pet.</li>
          <li>Welcome them home!</li>
        </ol>
      </section>

      {/* Testimonials */}
    
        <Testimonial/>
        {/* <h2>What Our Adopters Say</h2>
        <div className="testimonial-card">
          <p>"Adopting Luna was the best decision! The process was smooth and easy." - Sarah W.</p>
        </div>
        <div className="testimonial-card">
          <p>"Max has brought so much joy to our family. Thank you for making it possible!" - John D.</p>
        </div> */}
      
    </div>
    </div>
  );
};

export default Home;