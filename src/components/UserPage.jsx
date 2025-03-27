import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import "../styles/UserPage.css";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({ fullName: "", email: "", role: "Adopter" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  const handleRoleUpdate = async (userId, newRole) => {
    try {
      await axios.put(`http://localhost:5000/api/users/${userId}/role`, { role: newRole });
      fetchUsers();
    } catch (error) {
      console.error("Error updating role", error);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users", newUser);
      setShowForm(false);
      fetchUsers();
    } catch (error) {
      console.error("Error adding user", error);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === "All" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="users-container">
      <h1>User Management</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="filter-select">
          <option value="All">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Adopter">Adopter</option>
          <option value="Shelter">Shelter</option>
          <option value="Vet">Vet</option>
        </select>
        <button className="add-user-btn" onClick={() => setShowForm(!showForm)}>+ Add User</button>
      </div>

      {showForm && (
        <form onSubmit={handleAddUser} className="add-user-form">
          <input
            type="text"
            placeholder="Full Name"
            required
            value={newUser.fullName}
            onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="Admin">Admin</option>
            <option value="Adopter">Adopter</option>
            <option value="Shelter">Shelter</option>
            <option value="Vet">Vet</option>
          </select>
          <button type="submit" className="save-btn">Save User</button>
        </form>
      )}

      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleUpdate(user._id, e.target.value)}
                  className="role-select"
                >
                  <option value="Admin">Admin</option>
                  <option value="Adopter">Adopter</option>
                  <option value="Shelter">Shelter</option>
                  <option value="Vet">Vet</option>
                </select>
              </td>
              <td>
                <button className="delete-btn" onClick={() => handleDeleteUser(user._id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
