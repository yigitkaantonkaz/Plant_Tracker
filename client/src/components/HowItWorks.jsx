import React from 'react';
import { FaCamera } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { FaEye } from "react-icons/fa6";

const HowItWorks = () => {
    return (
      <section className="how-it-works">
        <div className="how-it-works-inner">
          <h2 className="how-it-works-title">How It Works</h2>

          <div className="icons icons-aligned">
            <div className="icon-block">
              <div className="icon-box"><FaCamera size={40} /></div>
              <p>Add a New Pod</p>
            </div>
            <div className="icon-block">
              <div className="icon-box"><FiUpload size={40} /></div>
              <p>Upload Growth Photos</p>
            </div>
            <div className="icon-block">
              <div className="icon-box"><FaEye size={40} /></div>
              <p>View Growth Timeline</p>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default HowItWorks;
  