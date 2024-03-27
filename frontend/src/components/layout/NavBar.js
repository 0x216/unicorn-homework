import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/NavBar.css';
import { FaUser } from 'react-icons/fa';

function NavBar() {
    return (
        <nav className="navbar">
            <div className="siteName">
                <h2>Smokeless</h2>
            </div>
            <div className="navbar-links">
                <Link to="/home">Home</Link>
                <div className="dropdown">
                    <FaUser className="user-icon"/>
                    <div className="dropdown-content">
                        <Link to="/profile">Profile</Link>
                        <Link to="/settings">Settings</Link>
                        <Link to="/logout">Logout</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
