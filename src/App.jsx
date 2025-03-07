import React, { useState } from "react";
import { Outlet } from "react-router-dom"; // ✅ Import Outlet
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { createContext } from "react";
export const toggleContext = createContext();

function App() {
  const [sideBarToggle, setSideBarToggle] = useState(false);

  return (
    <>
      <div className="app">
      <toggleContext.Provider value={{ sideBarToggle, setSideBarToggle }}>
        <Header/>
        <div className="main-container">
          <Sidebar sideBarToggle={sideBarToggle} />
          <div className={`content${sideBarToggle ? "collapse" : ""}`} >
            <Outlet /> 
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </toggleContext.Provider>
      </div>
    </>
  );
}

export default App;
