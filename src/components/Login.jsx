import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setToken, setUserState } from "./utils/userSlice";
import "./styles/Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.userDetails);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      navigate("/"); // Redirect to home if user is already logged in
    }
  }, [navigate, user]);

  // Login function
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      console.log("Missing fields");
      toast.error("All fields are required");
      return;
    }
  
    try {
      const { email, password } = formData;
      let { data } = await axios.post("https://youtube-clone-backend-jf4n.onrender.com/api/users/login", { email: formData.email.toLowerCase(), 
        password: formData.password });
  
      if (data) {
        toast.success("Login successful!");
        dispatch(setUserState(data.user)); // Set user state in Redux store
        dispatch(setToken(data.jwtToken)); // Set token in Redux store
        navigate("/"); // Redirect to home
      }
    } catch (error) {
      console.log("Login error:", error.response?.data?.message);
      const errorMessage = error.response?.data?.message || "Login failed";
      
      if (errorMessage.toLowerCase().includes("user not found")) {
        toast.error("User not found. Please sign up first!");
      } else {
        toast.error(errorMessage);
      }
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleFormSubmit} className="login-form">
        <h2>User Login</h2>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          required
          value={formData.email}
          name="email"
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={formData.password}
          required
          name="password"
          autoComplete="true"
          onChange={handleChange}
        />

        <button type="submit" className="login-btn">
          Submit
        </button>

        <p>
          Don't have an account?{" "}
          <Link to="/signUp" className="signup-link">
            Sign Up here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
