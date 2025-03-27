import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import Navbar from "./components/Navbar.jsx"; 
import Pets from "./components/Pets.jsx"; 
import Adopters from "./components/Adopters.jsx";
import AdopterProfile from "./components/AdopterProfile.jsx";
import Adopted from "./components/Adopted.jsx"; 
import Vets from "./components/Vets.jsx";
import UserPage from "./components/UserPage.jsx"; 
import Footer from "./components/Footer.jsx";
import Login from "./components/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Shelter from "./components/Shelter.jsx";
import Layout from "./components/Layout.jsx";
import "./App.css"; // Import global styles


const App = () => {
  return (
    <Router>
  <Routes>
    <Route path="/" element={<Layout/>}>
    <Route path="/" element={<Home />} />
    <Route path="/pets" element={<Pets />} />
    <Route path="/adopters" element={<Adopters />} />
    <Route path="/adopters/:id" element={<AdopterProfile />} />
    <Route path="/adopted" element={<Adopted />} /> 
    <Route path="/vets" element={<Vets />} />
    <Route path="/users" element={<UserPage />} /> 
    <Route path="/login" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/shelter" element={<Shelter />} />
    </Route> 
  </Routes>
    </Router>
  );
};

export default App;