import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link, useLocation } from 'react-router-dom';

const Gallery = () => {
  const [pods, setPods] = useState([]);
  const location = useLocation();

  useEffect(() => {
    api.get('/pods/')
      .then(res => setPods(res.data))
      .catch(err => console.error(err));
  }, [location.search]); 

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">My Plant Pods</h1>
      <div className="pod-grid">
        {pods.map((pod) => {
          const photo = pod.photos?.[0];
          const imgSrc = photo ? `http://localhost:8000${photo.image_path}` : '/placeholder.png';

          return (
            <div className="pod-card" key={pod.id}>
              <h2 className="pod-name">{pod.name}</h2>
              <p className="pod-date">
                {pod.date_planted ? new Date(pod.date_planted).toLocaleDateString() : 'No date'}
              </p>
              <img
                src={imgSrc}
                alt={pod.name}
                className="pod-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder.png";
                }}
              />
              <p className="photo-label">Initial Photo</p>
              <Link to={`/pods/${pod.id}`} className="view-button">View</Link>
            </div>
          );
        })}
      </div>
      <div className="new-pod-button-container">
        <Link to="/add" className="new-pod-button">New Plant Pod</Link>
      </div>
    </div>
  );
};

export default Gallery;
