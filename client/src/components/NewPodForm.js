import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { FaPhotoVideo } from "react-icons/fa";

const NewPodForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    photo: null,
  });
  const [datePlanted, setDatePlanted] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const podRes = await api.post('/pods/', {
        name: formData.name,
        description: formData.description,
        date_planted: formData.datePlanted, 
      });
      const podId = podRes.data.id;

      if (formData.photo) {
        const photoForm = new FormData();
        photoForm.append('file', formData.photo);
        await api.post(`/pods/${podId}/photos/`, photoForm);
      }

      navigate('/gallery');
    } catch (error) {
      console.error('Error creating pod:', error);
    }
  };

  return (
    <form className="styled-form" onSubmit={handleSubmit}>
      <h2>Add New Pod</h2>

      <label>Name</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label>Species</label>
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />

      <label>Date Planted</label>
      <input
        type="date"
        name="datePlanted"
        value={formData.datePlanted}
        onChange={handleChange}
      />

      <label>Photo</label>
      <div className="file-upload">
        <span className="upload-icon"><FaPhotoVideo /></span>
        <span>{formData.photo ? formData.photo.name : 'No file chosen'}</span>
        <input
          type="file"
          name="photo"
          onChange={handleChange}
        />
      </div>

      <button type="submit">Add Pod</button>
    </form>
  );
};

export default NewPodForm;