import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../assets/styles/NavBar.css";
import Image from "../../assets/images/logo.svg";
import { FaUser } from "react-icons/fa";
import { checkTokenValidity } from "../../api/auth";

function NavBar() {
  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const verifyToken = async () => {
      const isValid = await checkTokenValidity();
      setIsAuth(isValid);
    };

    verifyToken();
  }, []);

  return (
    <nav className="navbar">
      <div className="siteName">
        <div className="site-logo">
          <img src={Image} alt="Site Logo" />
        </div>
        <Link to="/home"><h2>Smokeless</h2></Link>
      </div>
      <div className="navbar-links">
        {isAuth && <Link to="/home">Home</Link>}
        {!isAuth && location.pathname === "/register" && (
          <Link to="/">Login</Link>
        )}
        {!isAuth && location.pathname === "/" && (
          <Link to="/register">Register</Link>
        )}
        <div className="dropdown">
          <FaUser className="user-icon" />
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
