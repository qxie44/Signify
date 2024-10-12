// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
import logo from './signify-logow.png'

function Navbar() {
    return (
        <nav className="navbar">
            <img src={logo} alt="Logo" className="logo" /> 
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/upload">Upload</Link></li>
                {/* Add more links as needed */}
            </ul>
        </nav>
    );
}

export default Navbar;
