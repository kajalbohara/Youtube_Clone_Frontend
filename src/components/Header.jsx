import { IoMdMenu } from "react-icons/io";
import { GoSearch } from "react-icons/go";
import { RiVideoUploadLine } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearToken, clearUserState } from "./utils/userSlice";
import { toast } from "react-toastify";
import { setUserChannelDetails } from "./utils/userChannelSlice";
import axios from "axios";
import "./styles/Header.css";
import { toggleContext } from "../App";
import React ,{ useContext } from "react";

export default function Header() {
  const { sideBarToggle, setSideBarToggle } = useContext(toggleContext); // Get isCollapse from Context

  const [toggle, setToggle] = useState(false); // State to manage dropdown menu visibility
  const [search, setSearch] = useState(""); // State to manage search input
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.userDetails); // Get user details from Redux store
  const userChannel = useSelector(
    (store) => store.userChannel.userChannelDetails
  ); // Get user channel details from Redux store
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user?.channel?.length >= 1) {
      const fetchUserChannel = async () => {
        try {
          let { data } = await axios.get(
            `https://youtube-clone-backend-jf4n.onrender.com/api/channel/${user?.channel[0]}`
          );
          dispatch(setUserChannelDetails(data.channel)); // Set user channel details in Redux store
        } catch (error) {
          console.log(error);
        }
      };
      fetchUserChannel();
    }
  }, [user]);

  // Handle user logout
  const handleLogout = () => {
    dispatch(clearToken());
    dispatch(clearUserState());
    toast.success("Logout success");
    setToggle(false);
  };

  // Handle sidebar toggle
  const handleSideBarToggle = () => {
    setSideBarToggle(!sideBarToggle);
  };

  // Handle search submit
  const handleSearchSubmit = () => {
    if (search.length <= 0) {
      return toast.error("Enter something to search");
    }
    navigate(`/search/${search}`);
    setSearch("");
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        {/* Sidebar toggle button */}
        <IoMdMenu
          className="menu-icon"
          size={24}
          onClick={() => setSideBarToggle(!sideBarToggle)}
        />
       
       
       <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
          alt="YouTube"
          className="logo-small"
        />
      </Link>

      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
          alt="YouTube"
          className="logo-large"
        />
      </Link>
      </div>

      <div className="search-field">
        {/* Search input and button */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search"
          className="search-bar"
        />
        <button type="submit" onClick={handleSearchSubmit} className="search-button">
          <GoSearch size={20} />
        </button>
      </div>

      <div className="nav-right">
        {user && Object.keys(user).length > 0 ? (
          <>
            {/* Upload video link for users with a channel */}
            {userChannel && Object.keys(userChannel).length >= 1 && (
              <Link className="upload-icon" to={"/uploadVideo"}>
                <RiVideoUploadLine size={20} />
              </Link>
            )}
            {/* Notification icon */}
            <FaRegBell className="notification-icon" size={20} />
            {/* User avatar or icon */}
            {user?.avatar ? (
              <img
                src={user.avatar}
                onClick={() => setToggle(!toggle)}
                className="avatar"
                alt="User Avatar"
              />
            ) : (
              <FaUserCircle
                onClick={() => setToggle(!toggle)}
                className="user-icon"
                size={24}
              />
            )}
            {/* Dropdown menu */}
            {toggle && (
              <ul className="dropdown-menu">
                <Link
                  onClick={() => setToggle(false)}
                  to={"/"}
                  className="dropdown-item"
                >
                  Home
                </Link>
                <Link
                  onClick={() => setToggle(false)}
                  to={"/userAccount"}
                  className="dropdown-item"
                >
                  My Account
                </Link>
                {userChannel && Object.keys(userChannel).length >= 1 ? (
                  <>
                    <Link
                      onClick={() => setToggle(false)}
                      to={`/channel/${userChannel._id}`}
                      className="dropdown-item"
                    >
                      My Channel
                    </Link>
                    <Link
                      to={"/uploadVideo"}
                      onClick={() => setToggle(false)}
                      className="dropdown-item"
                    >
                      Upload Video
                    </Link>
                  </>
                ) : (
                  <Link
                    onClick={() => setToggle(false)}
                    to={"/createChannel"}
                    className="dropdown-item"
                  >
                    Create Channel
                  </Link>
                )}
                <li onClick={handleLogout} className="dropdown-item logout">
                  Logout
                </li>
              </ul>
            )}
          </>
        ) : (
          <Link to="/logIn" className="login-button">
            <FaUserCircle size={24} /> Login
          </Link>
        )}
      </div>
    </div>
  );
}
