import React,{useContext} from "react";
import { toggleContext } from "../App";
import { Link } from "react-router-dom";
import { PiFilmSlate } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import { LuShoppingBag } from "react-icons/lu";
import { IoFlagOutline } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { IoMdMusicalNotes } from "react-icons/io";
import { FaHistory } from "react-icons/fa";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { MdOutlineOndemandVideo, MdOutlinePlaylistPlay, MdHome, MdOutlineWatchLater, MdOutlineSubscriptions } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { AiOutlineLike } from "react-icons/ai";

import "./styles/sidebar.css";
const Sidebar =() => {
  const { sideBarToggle } = useContext(toggleContext);  // Get isCollapse from Context

  return (
    <div className={`sidebar ${sideBarToggle ? "collapsed" : ""}`}>
      {/* Always Visible */}
      <Link to="/" className="sidebar-item"><MdHome className="icon" />{!sideBarToggle && "Home"}</Link>

      
      <div className="sidebar-item">
        <SiYoutubeshorts className="icon" />
        {!sideBarToggle && "Shorts"}
      </div>
      <div className="sidebar-item">
        <MdOutlineSubscriptions className="icon" />
        {!sideBarToggle && "Subscriptions"}
      </div>
      <div className="divider"></div>

      <div className="sidebar-item">
        <span className="icon">👤</span>
        {!sideBarToggle && "You"}
      </div>

      {/* Hide the rest when collapsed */}
      <div className={`hidden-items ${sideBarToggle ? "hide" : ""}`}>
        <div className="sidebar-item">
          <FaHistory className="icon" />
          History
        </div>
        <div className="sidebar-item">
          <MdOutlinePlaylistPlay className="icon" />
          Playlist
        </div>
        <div className="sidebar-item">
          <MdOutlineOndemandVideo className="icon" />
          Your videos
        </div>
        <div className="sidebar-item">
          <MdOutlineWatchLater className="icon" />
          Watch Later
        </div>
        <div className="sidebar-item">
          <AiOutlineLike className="icon" />
          Liked videos
        </div>

        <div className="divider"></div>

        <div className="sidebar-item">
          <MdOutlineLocalFireDepartment className="icon" />
          Trending
        </div>
        <div className="sidebar-item">
          <LuShoppingBag className="icon" />
          Shopping
        </div>
        <div className="sidebar-item">
          <IoMdMusicalNotes className="icon" />
          Music
        </div>
        <div className="sidebar-item">
          <PiFilmSlate className="icon" />
          Movies
        </div>

        <div className="divider"></div>

        <div className="sidebar-item">
          <CiSettings className="icon" />
          Settings
        </div>
        <div className="sidebar-item">
          <IoFlagOutline className="icon" />
          Report History
        </div>
        <div className="sidebar-item">
          <IoIosHelpCircleOutline className="icon" />
          Help
        </div>

        <div className="divider"></div>

        <p className="sidebar-footer">
          About Press Copyright Contact us Creators Advertise Developers Terms
          Privacy Policy & Safety How YouTube works Test new features
        </p>

        <div className="divider"></div>

        <p className="sidebar-footer">&copy; Google LLC</p>
      </div>
    </div>
  );
};

export default Sidebar;


