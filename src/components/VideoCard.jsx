import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import formatNumber from "./utils/formatNumber";
import timeAgo from "./utils/timeAgo";
import "./styles/VideoCard.css";
import { toggleContext } from "../App";
import { useContext } from "react";

const VideoCard = ({ videoId, title, thumbnailUrl, channelId, views, createdAt }) => {
  const [channelData, setChannelData] = useState({});
  const { sideBarToggle } = useContext(toggleContext);  // Get isCollapse from Context

  useEffect(() => {
    // Fetch channel details
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:7000/api/channel/${channelId}`
        );
        if (data) {
          setChannelData(data.channel);
        

        }
      } catch (error) {
        console.error("Error fetching channel data:", error);
      }
    };
    fetchData();
  }, [channelId]);
  return (
    <div className="video-main"
    style={{
      width: sideBarToggle ? "320px" : "380px",
      height: sideBarToggle ? "270px" : "290px",
  }}
    >
            {/* Thumbnail */}
            <Link to={`/video/${videoId}`}>
                <img src={thumbnailUrl || ""} alt={title} className="thumbnail" />
            </Link>

            {/* Video Info */}
            <div className="video-information">
                <img className="logo" src={channelData.channelLogo || " img "} />
                <div className="Details">
                    <h3 className="vid-title">{title.length > 72 ? title.slice(0, 72) + "..." : title}</h3>
                    <Link to={`/channel/${channelData?._id}`} className="channel-titles">{channelData?.channelName}</Link>
                    <span className="videos-info">{formatNumber(views)} Views • {timeAgo(createdAt)}</span>
                </div>
            </div>


        </div>
    
  );
};

export default VideoCard;
