import React, { useState } from "react";
import "./AdminSignUp.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AdminSignIn() {
  const [formData, setFormData] = useState({
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
        "http://localhost:2024/api/v1/admin/signin",
        formData
      );
      if (response.status) navigate("/admindashboard");
      console.log(response);
    } catch (error) {
      console.error("Error from code:", error);
      toast.error(error.response.data.message, {
        position: "bottom-right",
        autoClose: 5000,
      });
    } finally {
      //   console.log(formData.name, formData.email, formData.password);
      setFormData({
        email: "",
        password: "",
      });
    }
  };
  return (
    <div className="form-shadow">
      <h1>Sign In Admin</h1>
      <form onSubmit={handleSubmit}>
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
          <Link to="/signup">switch to SignUp</Link>
        </div>
      </form>
    </div>
  );
}

export default AdminSignIn;
