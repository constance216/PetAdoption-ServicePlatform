import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiUsers, FiHeart, FiHome, FiDatabase, FiPlus, FiBell, FiList, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import "../styles/Dashboard.css";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const Dashboard = () => {
  const [stats, setStats] = useState({ totalPets: 0, adoptedPets: 0, adopters: 0, shelters: 0, pendingRequests: 0 });
  const [recentActivities, setRecentActivities] = useState([]);
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const [newPet, setNewPet] = useState({ name: "", breed: "", age: "", imageUrl: "" });
  const [isAddPetModalOpen, setIsAddPetModalOpen] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/dashboard");
      setStats(res.data.stats);
      setRecentActivities(res.data.recentActivities);
      setAdoptionRequests(res.data.pendingRequests);
    } catch (error) {
      console.error("Error fetching dashboard data", error);
    }
  };

  const handleApproveRequest = async (requestId) => {
    try {
      await axios.put(`http://localhost:5000/api/adoption-requests/${requestId}/approve`);
      fetchDashboardData();
    } catch (error) {
      console.error("Error approving request", error);
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      await axios.put(`http://localhost:5000/api/adoption-requests/${requestId}/reject`);
      fetchDashboardData();
    } catch (error) {
      console.error("Error rejecting request", error);
    }
  };

  const handleAddPet = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newPet.name);
      formData.append("breed", newPet.breed);
      formData.append("age", newPet.age);
      formData.append("imageUrl", newPet.imageUrl);

      await axios.post("http://localhost:5000/api/pets", formData);
      fetchDashboardData();
      setIsAddPetModalOpen(false);
      setNewPet({ name: "", breed: "", age: "", imageUrl: "" });
    } catch (error) {
      console.error("Error adding new pet", error);
    }
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Pets Adopted",
        data: [12, 19, 3, 5, 2, 3],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.1,
      },
      {
        label: "Pets Available",
        data: [6, 10, 15, 8, 10, 13],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="quick-actions">
          <button className="action-button" onClick={() => setIsAddPetModalOpen(true)}>
            <FiPlus /> Add Pet
          </button>
          <Link to="/notifications" className="action-button">
            <FiBell /> Notifications
          </Link>
        </div>
      </header>

      <div className="dashboard-grid">
        <div className="card">
          <FiDatabase className="icon" />
          <h3>Total Pets</h3>
          <p>{stats.totalPets}</p>
        </div>
        <div className="card">
          <FiHeart className="icon" />
          <h3>Adopted Pets</h3>
          <p>{stats.adoptedPets}</p>
        </div>
        <div className="card">
          <FiUsers className="icon" />
          <h3>Registered Adopters</h3>
          <p>{stats.adopters}</p>
        </div>
        <div className="card">
          <FiHome className="icon" />
          <h3>Active Shelters</h3>
          <p>{stats.shelters}</p>
        </div>
        <div className="card">
          <FiList className="icon" />
          <h3>Pending Requests</h3>
          <p>{stats.pendingRequests}</p>
        </div>
      </div>

      <div className="recent-activities">
        <h2>Recent Activities</h2>
        <ul>
          {recentActivities.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>
      </div>

      <div className="adoption-requests">
        <h2>Pending Adoption Requests</h2>
        {adoptionRequests.length === 0 ? (
          <p>No pending requests</p>
        ) : (
          <ul>
            {adoptionRequests.map((request) => (
              <li key={request._id}>
                {request.adopterName} requested to adopt {request.petName}
                <button className="approve-btn" onClick={() => handleApproveRequest(request._id)}>
                  <FiCheckCircle /> Approve
                </button>
                <button className="reject-btn" onClick={() => handleRejectRequest(request._id)}>
                  <FiXCircle /> Reject
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="line-chart">
        <h2>Adoption and Available Pets Trend</h2>
        <Line data={lineData} />
      </div>

      {/* Add Pet Modal */}
      {isAddPetModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Pet</h3>
            <label>Name</label>
            <input
              type="text"
              value={newPet.name}
              onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
              placeholder="Pet Name"
            />
            <label>Breed</label>
            <input
              type="text"
              value={newPet.breed}
              onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
              placeholder="Pet Breed"
            />
            <label>Age</label>
            <input
              type="number"
              value={newPet.age}
              onChange={(e) => setNewPet({ ...newPet, age: e.target.value })}
              placeholder="Pet Age"
            />
            <label>Image URL</label>
            <input
              type="file"
              onChange={(e) => setNewPet({ ...newPet, imageUrl: e.target.files[0] })}
            />
            <button onClick={handleAddPet} className="btn btn-submit">Add Pet</button>
            <button onClick={() => setIsAddPetModalOpen(false)} className="btn btn-cancel">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
