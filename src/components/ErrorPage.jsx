import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/ErrorPage.css"; 

const ErrorPage = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  return (
    <div className="error-container">
      {/* Display error code */}
      <h2 className="error-code">404</h2>
      {/* Display error message */}
      <h2 className="error-message">Page Not Found</h2>
      {/* Button to navigate back to the previous page */}
      <button className="error-button" onClick={() => navigate(-1)}>
        Go back
      </button>
    </div>
  );
};

export default ErrorPage;
