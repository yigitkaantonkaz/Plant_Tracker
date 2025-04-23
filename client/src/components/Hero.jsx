import React from 'react';
import { useNavigate } from 'react-router-dom';
import plantImage from '../assets/Mask_group.png';
import demoVideo from '../assets/plant_video.mp4'; 

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-text">
        <h1>Track the Life of <br /> Your Plants Visually<br /> & Simply</h1>
        <p>Record your plant pods and watch them grow over time 
        <br /> with progress photos. Capture each stage of their 
        <br /> development. Keep a visual timeline that helps you stay 
        <br /> connected with your plant’s growth.</p>
        <button onClick={() => navigate('/add')}>Get Started</button>

        <div className="video-wrapper">
          <video className="hero-video" controls>
            <source src={demoVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p className="video-title"><strong>Watch Growth in Motion</strong></p>
        </div>
        
      </div>
      <img src={plantImage} alt="img_1" />
    </section>
  );
};

export default Hero;
