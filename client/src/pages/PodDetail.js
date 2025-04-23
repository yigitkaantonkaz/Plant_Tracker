import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { IoDocumentSharp } from "react-icons/io5";

const PodDetail = () => {
  const { id } = useParams();
  const [pod, setPod] = useState(null);
  const [file, setFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');

  const fetchPod = () => {
    api.get(`/pods/${id}`)
    .then(res => {
        setPod(res.data);
        setEditName(res.data.name);
        setEditDesc(res.data.description || '');
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchPod();
  }, [id]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      await api.post(`/pods/${id}/photos/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFile(null);
      fetchPod();
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/pods/${id}`, {
        name: editName,
        description: editDesc
      });
      setIsEditing(false);
      fetchPod();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (!pod) return <p>Loading...</p>;

  const mainPhoto = pod.photos?.[0];
  const mainImage = mainPhoto ? `http://localhost:8000${mainPhoto.image_path}` : '/placeholder.png';

  return (
    <div className="pod-detail-container">
      <h1 className="page-title">View Details</h1>

      <div className="main-card">
        <img src={mainImage} alt="Main Pod" className="main-image" />
        <div className="pod-info">
          {isEditing ? (
            <form onSubmit={handleEditSubmit} className="edit-form">
              <label>Name</label>
                <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="input"
                />

                <label>Description</label>
                <textarea
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                className="textarea"
                rows="3"
                />
              <button type="submit" className="button">Save</button>
              <button type="button" onClick={() => setIsEditing(false)} className="button-outline">Cancel</button>
            </form>
          ) : (
            <>
              <h2>{pod.name}</h2>
              <p><strong>Plant:</strong> {pod.name}</p>
              <p><strong>Date Added:</strong> {new Date(pod.date_planted || pod.created_at).toLocaleDateString()}</p>
              <p className="pod-desc">{pod.description}</p>
              <button onClick={() => setIsEditing(true)} className="button">Edit Pod</button>
            </>
          )}
        </div>
      </div>

      <div className="upload-section">
        <h2>Upload New Photo</h2>
        <form onSubmit={handleUpload} className="upload-form">
        <label className="file-upload">
            <span className="button-outline"><IoDocumentSharp /> Choose File</span>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                hidden
            />
            </label>
            <span className="file-name">{file?.name}</span>
          <button type="submit" className="button">Upload</button>
        </form>
      </div>

      <h2 className="section-title">Growth Progress</h2>
      {pod.photos.length === 0 ? (
        <p>No photos yet.</p>
      ) : (
        <div className="photo-grid">
          {pod.photos.map(photo => (
            <div key={photo.id} className="photo-item">
              <img src={`http://localhost:8000${photo.image_path}`} alt={`Photo ${photo.id}`} />
              <p className="photo-date">{new Date(photo.timestamp).toLocaleDateString()}</p>
              <button
                onClick={async () => {
                  await api.delete(`/photos/${photo.id}`);
                  fetchPod();
                }}
                className="delete-photo"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PodDetail;
