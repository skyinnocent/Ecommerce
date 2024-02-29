import React from "react";
import "./logo.css";
import { Link } from "react-router-dom";
const logo = require("./F-removebg-preview.png");
const Logo = () => {
  return (
    <div className="logo">
      <Link to="/home">
        <img src={logo} alt="Logo" />
      </Link>
    </div>
  );
};

export default Logo;
