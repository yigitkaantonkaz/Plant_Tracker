import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const NotFound = () => {
  return (
    <>
      <Navbar />
      <div className="container" style={{ textAlign: 'center' }}>
        <h1>404 - Page Not Found</h1>
        <p>Oops! This page doesn't exist.</p>
        <Link to="/pods">
          <button>Go to Pods</button>
        </Link>
      </div>
    </>
  );
};

export default NotFound;
