import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/ErrorPage.css"; 

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <h2 className="error-code">404</h2>
      <h2 className="error-message">Page Not Found</h2>
      <button className="error-button" onClick={() => navigate(-1)}>
        Go back
      </button>
    </div>
  );
};

export default ErrorPage;
