import React, { useState } from "react";
import "./AdminSignUp.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AdminSignup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:2024/api/v1/admin",
        formData
      );
      console.log("consoling Ok", response.status);
      console.log("consoling data", response.data);
      //   console.log("consoling respone", response);
      if (response.status) navigate("/signin");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message, {
        position: "bottom-right",
        autoClose: 5000,
      });
    } finally {
      //   console.log(formData.name, formData.email, formData.password);
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    }
  };
  return (
    <div className="form-shadow">
      <h1>SignUp Admin</h1>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <label>name</label>
          <input
            value={formData.name}
            onChange={handleChange}
            name="name"
          ></input>
        </div>
        <div className="input">
          <label>email</label>
          <input
            type="email"
            value={formData.email}
            onChange={handleChange}
            name="email"
          ></input>
        </div>
        <div className="input">
          <label>password</label>
          <input
            value={formData.password}
            onChange={handleChange}
            name="password"
          ></input>
        </div>
        <button type="submit">submit</button>
        <div className="switch">
          <Link to="/signin">switch to Signin</Link>
        </div>
      </form>
    </div>
  );
}

export default AdminSignup;
