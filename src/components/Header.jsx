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

export default function ( ) {
    const { sideBarToggle ,setSideBarToggle} = useContext(toggleContext);  // Get isCollapse from Context
  
  const [toggle, setToggle] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.userDetails);
  const userChannel = useSelector((store) => store.userChannel.userChannelDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user?.channel?.length >= 1) {
      const fetchUserChannel = async () => {
        try {
          let { data } = await axios.get(
            `http://localhost:7000/api/channel/${user?.channel[0]}`
          );
          dispatch(setUserChannelDetails(data.channel));
        } catch (error) {
          console.log(error);
        }
      };
      fetchUserChannel();
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(clearToken());
    dispatch(clearUserState());
    toast.success("Logout success");
    setToggle(false);
  };

  const handleSideBarToggle = () => {
    setSideBarToggle(!sideBarToggle);
  };

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
        <IoMdMenu className="menu-icon" size={24}   onClick={() => setSideBarToggle(!sideBarToggle)}
 />
        <Link to={"/"}>
          <img src="/logo/YouTube_Logo.svg" alt="YouTube" className="logo-small" />
        </Link>
        <Link to={"/"}>
          <img src="/logo/YouTube_Logo.svg" alt="YouTube" className="logo-large" />
        </Link>
      </div>
      <div className="nav-center">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search"
          className="search-input"
        />
        <button type="submit" onClick={handleSearchSubmit} className="search-button">
          <GoSearch size={20} />
        </button>
      </div>
      <div className="nav-right">
        {user && Object.keys(user).length > 0 ? (
          <>
            {userChannel && Object.keys(userChannel).length >= 1 && (
              <Link className="upload-icon" to={"/uploadVideo"}>
                {/* <RiVideoUploadLine size={20} /> */}
              </Link>
            )}
            {user?.avatar ? (
              <img
                src={user.avatar}
                onClick={() => setToggle(!toggle)}
                className="avatar"
                alt="User Avatar"
              />
            ) : (
              <FaUserCircle onClick={() => setToggle(!toggle)} className="user-icon" size={24} />
            )}
            {toggle && (
              <ul className="dropdown-menu">
                <Link onClick={() => setToggle(false)} to={"/"} className="dropdown-item">
                  Home
                </Link>
                <Link onClick={() => setToggle(false)} to={"/userAccount"} className="dropdown-item">
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
