import { IoMdMenu } from "react-icons/io";
import { GoSearch } from "react-icons/go";
import { FaRegBell } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

import "./styles/Header.css";

export default function () {
  return (
    <div className="navbar">
      <div className="nav-left">
        <IoMdMenu className="menu-icon" size={24} />
        <Link to={"/"}>
          <img
            src="/logo/YouTube_Logo.svg"
            alt="YouTube"
            className="logo-small"
          />
        </Link>
        <Link to={"/"}>
          <img
            src="/logo/YouTube_Logo.svg"
            alt="YouTube"
            className="logo-large"
          />
        </Link>
      </div>
      <div className="nav-center">
        <input type="text" placeholder="Search" className="search-input" />
        <button type="submit" className="search-button">
          <GoSearch size={20} />
        </button>
      </div>
      <div className="nav-right">
        <Link className="upload-icon"></Link>

        <FaRegBell className="notification-icon" size={20} />

        <img className="avatar" alt="User Avatar" />

        <FaUserCircle className="user-icon" size={24} />

        <ul className="dropdown-menu">
          <Link to={"/"} className="dropdown-item">
            Home
          </Link>
          <Link className="dropdown-item">My Account</Link>

          <Link className="dropdown-item">My Channel</Link>
          <Link className="dropdown-item">Upload Video</Link>

          <Link className="dropdown-item">Create Channel</Link>

          <li className="dropdown-item logout">Logout</li>
        </ul>

        <Link to="#" className="login-button">
          <FaUserCircle size={24} /> Login
        </Link>
      </div>
    </div>
  );
}
