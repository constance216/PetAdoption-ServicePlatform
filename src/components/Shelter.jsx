import React, { useState } from 'react';
import { GiPawPrint } from 'react-icons/gi';
import { Notify } from 'notiflix';
import '../styles/Shelter.css';
import AllPets from './AllPets';

const ShelterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    description: '',
    age: '',
    image: null,
  });

  const [loading, setLoading] = useState(false); // Added missing state for loading

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      Notify.failure('Please select an image');
      return;
    }

    setLoading(true);
    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await fetch('http://localhost:5000/api/petM/create', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        Notify.success('Pet added successfully!');
        setFormData({
          name: '',
          breed: '',
          description: '',
          age: '',
          image: null,
        });
      } else {
        const errorData = await response.json();
        Notify.failure(errorData.message);
      }
    } catch (error) {
      Notify.failure('Failed to create pet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shelter-container">
      <AllPets/>
      <div className="modal">
        <div className="modal-content">
          <h3>Add New Pet</h3>

          <form onSubmit={handleSubmit}>
            <input
              className="input-field"
              type="text"
              name="name"
              placeholder="Pet Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              className="input-field"
              type="text"
              name="breed"
              placeholder="Breed"
              value={formData.breed}
              onChange={handleChange}
            />
            <input
              className="input-field"
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
            />
            <input
              className="input-field"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
            <textarea
              className="input-field"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />
            <div className="modal-footer">
              <button className="btn-primary" type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add Pet'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShelterPage;
