import React from 'react';
import { FaCheck } from "react-icons/fa";
import { MdOutlineEventNote } from "react-icons/md";
import { GrGallery } from "react-icons/gr";

const Features = () => {
  return (
    <section className="features">
  <h2>Why Use Plant Tracker?</h2>
  <div className="features-grid">
    <div className="feature">
      <div className="icon"><FaCheck size={40} /></div>
      <strong>See Your Plant’s Journey</strong>
      <p>Upload progress pictures to create a time-lapse-like view of growth</p>
    </div>
    <div className="feature">
      <div className="icon"><MdOutlineEventNote size={40} /></div>
      <strong>Keep Notes & Tags</strong>
      <p>Record dates, types, and custom notes for each plant pod</p>
    </div>
    <div className="feature">
      <div className="icon"><GrGallery size={40} /></div>
      <strong>Organized Pod Gallery</strong>
      <p>All your plants in one dashboard, with photo access and filters.</p>
    </div>
  </div>
</section>
  );
};

export default Features;
