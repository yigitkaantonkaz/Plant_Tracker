import React from 'react';
import { Link } from 'react-router-dom';
import { TbPlant2 } from "react-icons/tb";
import { IoIosMenu } from "react-icons/io";


const Navbar = () => {
  return (
    <header className="navbar">
      <Link to="/" className="logo">
        <TbPlant2 size={30} />
        <span>PLANT POD TRACKER</span>
      </Link>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/add">Add New Pods</Link>
        <Link to="/gallery">Gallery</Link>
      </nav>
      <Link className="menu-icon">
        <IoIosMenu size={40} />
      </Link>
    </header>
  );
};

export default Navbar;
