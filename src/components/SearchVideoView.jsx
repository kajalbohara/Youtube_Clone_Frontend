import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import formatNumber from "./utils/formatNumber";
import timeAgo from "./utils/timeAgo";
import "./styles/SearchVideoView.css";

const SearchVideoView = ({ item }) => {
  const [channelData, setChannelData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:7000/api/channel/${item?.channelId}`
        );
        if (data) {
          setChannelData(data.channel);
        }
      } catch (error) {
        console.error("Error fetching channel data:", error);
      }
    };
    fetchData();
  }, [item?.channelId]);

  return (
    <Link to={`/video/${item._id}`} className="search-video-container">
      <img className="search-thumbnail" src={item?.thumbnailUrl} alt="video thumbnail" />
      <div className="search-video-data">
        <div className="search-video-info">
          <h2 className="search-video-title">{item?.title}</h2>
          <p className="search-video-stats">
            {formatNumber(item?.views)} views • {timeAgo(item?.createdAt)}
          </p>
        </div>

        <div className="search-channel-info">
          <img className="search-channel-logo" src={channelData?.channelLogo} alt="channel logo" />
          <h2 className="search-channel-name">{channelData?.channelName}</h2>
        </div>

        <p className="search-video-description">
          {item?.description.length > 198 ? item?.description.slice(0, 198) + "..." : item?.description}
        </p>
      </div>
    </Link>
  );
};

export default SearchVideoView;
