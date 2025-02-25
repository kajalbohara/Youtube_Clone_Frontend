import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import timeAgo from "./utils/timeAgo";
import { useSelector } from "react-redux";
import formatNumber from "./utils/formatNumber";
import { toast } from "react-toastify";
import axios from "axios";
import "./styles/ChannelVideo.css";

const ChannelVideo = ({ triggerVideoFetching, item, channelData }) => {
  const user = useSelector((store) => store.user.userDetails); // Get user details from Redux store
  const token = useSelector((store) => store.user.token); // Get user token from Redux store
  const [op, setOp] = useState(false); // State to manage options menu visibility
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to delete video
  const handleDelete = async (videoId) => {
    try {
      const result = await axios.delete(
        `https://youtube-clone-backend-jf4n.onrender.com/api/video/deleteVideo/${videoId}/${channelData?._id}/${user?._id}`,
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );
      if (result) {
        toast.success("Video deleted successfully"); // Show success message
        triggerVideoFetching(); // Trigger re-fetching of videos
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message); // Show error message
    } finally {
      setOp(false); // Close options menu
    }
  };

  return (
    <div className="video-card">
      {/* Link to video detail page */}
      <Link to={`/video/${item._id}`}>
        <img
          src={item.thumbnailUrl}
          alt={item.title.slice(0, 10) + "..."}
          className="video-thumbnail_class"
        />
      </Link>
      <div className="video-info">
        <div className="description">
          {/* Video title */}
          <h2 className="video-title">
            {item?.title?.length > 72 ? item?.title.slice(0, 72) + "..." : item?.title}
          </h2>
          {/* Video metadata */}
          <p className="video-meta">
            {formatNumber(item?.views)} views • {timeAgo(item?.createdAt)}
          </p>
        </div>
        <div className="video-options">
          {/* Options menu for video owner */}
          {user?._id === channelData?.owner && (
            <>
              <HiOutlineDotsVertical onClick={() => setOp(!op)} className="options-icon" />
              <ul className={`options-menu ${op ? "show" : "hide"}`}>
                <li
                  onClick={() => {
                    setOp(false);
                    navigate(`/updateVideo/${item._id}`);
                  }}
                  className="option-item"
                >
                  <CiEdit />
                  Edit
                </li>
                <li onClick={() => handleDelete(item._id)} className="option-item">
                  <MdDeleteOutline />
                  Delete
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelVideo;
