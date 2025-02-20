import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import formatNumber from "./utils/formatNumber";
import timeAgo from "./utils/timeAgo";
import "./styles/SearchVideoView.css";

const SearchVideoView = ({ item }) => {
  const [channelData, setChannelData] = useState({}); // State to store channel data

  useEffect(() => {
    // Function to fetch channel data
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:7000/api/channel/${item?.channelId}`
        );
        if (data) {
          setChannelData(data.channel); // Set channel data
        }
      } catch (error) {
        console.error("Error fetching channel data:", error);
      }
    };
    fetchData();
  }, [item?.channelId]);

  return (
    <Link to={`/video/${item._id}`} className="video-container">
      {/* Video thumbnail */}
      <img className="video-container__thumbnail" src={item?.thumbnailUrl} alt="video thumbnail" />

      <div className="video-container__data">
        <div className="flexing">
          {/* Channel logo */}
          <img className="video-container1__channel-logo" src={channelData?.channelLogo} alt="channel logo" />
          
          <div className="video-container__info">
            {/* Video title */}
            <h2 className="video-container__title">{item?.title}</h2>
            <div className="video-container__channel-info">
              {/* Channel name */}
              <h2 className="video-container2__channel-name">{channelData?.channelName}</h2>
            </div>
            {/* Video stats */}
            <p className="video-container__stats">
              {formatNumber(item?.views)} views • {timeAgo(item?.createdAt)}
            </p>
          </div>
        </div>
        {/* Video description */}
        <p className="video-container__description">
          {item?.description.length > 198 ? item?.description.slice(0, 198) + "..." : item?.description}
        </p>
      </div>
    </Link>
  );
};

export default SearchVideoView;
