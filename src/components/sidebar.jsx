import React, { useContext, useState, useEffect } from "react";
import { toggleContext } from "../App";
import { Link } from "react-router-dom";
import { PiFilmSlate } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import { LuShoppingBag } from "react-icons/lu";
import { IoFlagOutline } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { IoMdMusicalNotes } from "react-icons/io";
import { FaHistory, FaUserCircle } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { MdOutlineOndemandVideo, MdOutlinePlaylistPlay, MdHome, MdOutlineWatchLater, MdOutlineSubscriptions } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { AiOutlineLike } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { clearToken, clearUserState } from "./utils/userSlice";

import "./styles/sidebar.css";

const Sidebar = () => {
  const { sideBarToggle } = useContext(toggleContext); // Get sidebar toggle state from context
  const [toggle, setToggle] = useState(false); // State to manage dropdown menu visibility
  const user = useSelector((store) => store.user?.userDetails); // Get user details from Redux store
  const userChannel = useSelector((store) => store.userChannel?.userChannelDetails); // Get user channel details from Redux store
  const dispatch = useDispatch();

  // Logs toggle state change
  useEffect(() => {
    console.log("Toggle changed to:", toggle);
  }, [toggle]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".mbl-view-icons")) {
        setToggle(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  // Handle user logout
  const handleLogout = () => {
    dispatch(clearToken());
    dispatch(clearUserState());
    toast.success("Logout success");
    setToggle(false);
  };

  return (
    <>
      <div className={`sidebar ${sideBarToggle ? "collapsed" : ""}`}>
        <Link to="/" className="sidebar-item"><MdHome className="icon" />{!sideBarToggle && "Home"}</Link>

        <div className="sidebar-item"><SiYoutubeshorts className="icon" />{!sideBarToggle && "Shorts"}</div>
        <div className="sidebar-item"><MdOutlineSubscriptions className="icon" />{!sideBarToggle && "Subscriptions"}</div>
        <div className="divider"></div>

        <div className="sidebar-item"><span className="icon">👤</span>{!sideBarToggle && "You"}</div>

        <div className={`hidden-items ${sideBarToggle ? "hide" : ""}`}>
          <div className="sidebar-item"><FaHistory className="icon" />History</div>
          <div className="sidebar-item"><MdOutlinePlaylistPlay className="icon" />Playlist</div>
          <div className="sidebar-item"><MdOutlineOndemandVideo className="icon" />Your videos</div>
          <div className="sidebar-item"><MdOutlineWatchLater className="icon" />Watch Later</div>
          <div className="sidebar-item"><AiOutlineLike className="icon" />Liked videos</div>

          <div className="divider"></div>

          <div className="sidebar-item"><MdOutlineLocalFireDepartment className="icon" />Trending</div>
          <div className="sidebar-item"><LuShoppingBag className="icon" />Shopping</div>
          <div className="sidebar-item"><IoMdMusicalNotes className="icon" />Music</div>
          <div className="sidebar-item"><PiFilmSlate className="icon" />Movies</div>

          <div className="divider"></div>

          <div className="sidebar-item"><CiSettings className="icon" />Settings</div>
          <div className="sidebar-item"><IoFlagOutline className="icon" />Report History</div>
          <div className="sidebar-item"><IoIosHelpCircleOutline className="icon" />Help</div>

          <div className="divider"></div>

          <p className="sidebar-footer">
            About Press Copyright Contact us Creators Advertise Developers Terms
            Privacy Policy & Safety How YouTube works Test new features
          </p>

          <div className="divider"></div>
          <p className="sidebar-footer">&copy; Google LLC</p>
        </div>
      </div>

      <div className="mbl-menu">
        <button className="mbl-view-icons"><Link to="/"><MdHome className="mbl-home-icon" /></Link></button>
        <button className="mbl-view-icons"><SiYoutubeshorts className="icon" /></button>
        <Link to={"/uploadVideo"} onClick={() => setToggle(false)} id="plus"><FiPlusCircle /></Link>
        <button className="mbl-view-icons"><MdOutlineSubscriptions /></button>

        <div className="mbl-view-icons">
          {user && Object.keys(user).length > 0 ? (
            <>
              {userChannel && Object.keys(userChannel).length >= 1 && (
                <Link className="upload-icon" to={"/uploadVideo"}></Link>
              )}
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  onClick={() => setToggle((prev) => !prev)}
                  id="avatar"
                  alt="User Avatar"
                />
              ) : (
                <>
                  <FaUserCircle onClick={() => setToggle((prev) => !prev)} className="user-icon" size={24} />
                </>
              )}
              {toggle && (
                <ul className="mbl-dropdown-menu">
                  <Link onClick={() => setToggle(false)} to={"/"} className="mbl-dropdown-item">Home</Link>
                  <Link onClick={() => setToggle(false)} to={"/userAccount"} className="mbl-dropdown-item">My Account</Link>
                  {userChannel && Object.keys(userChannel).length >= 1 ? (
                    <>
                      <Link onClick={() => setToggle(false)} to={`/channel/${userChannel._id}`} className="mbl-dropdown-item">My Channel</Link>
                      <Link to={"/uploadVideo"} onClick={() => setToggle(false)} className="mbl-dropdown-item">Upload Video</Link>
                    </>
                  ) : (
                    <Link onClick={() => setToggle(false)} to={"/createChannel"} className="mbl-dropdown-item">Create Channel</Link>
                  )}
                  <li onClick={handleLogout} className="mbl-dropdown-item logout">Logout</li>
                </ul>
              )}
            </>
          ) : (
            <Link to="/logIn" id="lgn-btn"><FaUserCircle size={24} /></Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
