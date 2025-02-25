import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./styles/Signup.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    avatar: "",
  });

  const navigate = useNavigate();
  const user = useSelector((store) => store.user.userDetails);

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      navigate("/"); // Redirect to home if user is already logged in
    }
  }, [navigate, user]);

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.email || !formData.password || !formData.userName || !formData.avatar) {
      toast.error("All fields are required");
      return;
    }
  
    try {
      const { userName, email, password, avatar } = formData;
      let { data } = await axios.post("https://youtube-clone-backend-jf4n.onrender.com/api/users/signup", {
        userName, email, password, avatar
      });
  
      if (data) {
        toast.success("User registered successfully!");
        navigate("/login"); // Redirect to login page after signup
      }
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleFormSubmit} className="signup-form">
        <h2>User SignUp</h2>

        <label htmlFor="userName">Username</label>
        <input
          required
          value={formData.userName}
          onChange={handleChange}
          name="userName"
          id="userName"
          type="text"
        />

        <label htmlFor="email">Email</label>
        <input
          required
          id="email"
          type="email"
          value={formData.email}
          name="email"
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          required
          id="password"
          type="password"
          value={formData.password}
          name="password"
          autoComplete="true"
          onChange={handleChange}
        />

        <label htmlFor="avatar-form">Avatar Link</label>
        <input
          required
          id="avatar-form"
          type="text"
          value={formData.avatar}
          name="avatar"
          onChange={handleChange}
        />

        <button type="submit" className="signup-btn">Submit</button>
        <p>
          Already have an account? <Link to="/login" className="login-link">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;