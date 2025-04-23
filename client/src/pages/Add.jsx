import React from 'react';
import NewPodForm from '../components/NewPodForm';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const navigate = useNavigate();

  return (
    <NewPodForm onPodCreated={() => {
      const key = new Date().getTime();
      navigate(`/gallery?refresh=${key}`); 
    }} />
  );
};

export default Add;
