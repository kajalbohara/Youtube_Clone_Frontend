import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ChannelVideo from "./ChannelVideo";
import Loader from "./Loader";
import "./styles/ChannelDetail.css";

const ChannelDetail = () => {
  const params = useParams(); // Get URL parameters
  const [channelData, setChannelData] = useState({}); // State to store channel data
  const [channelVideos, setChannelVideos] = useState([]); // State to store channel videos
  const user = useSelector((store) => store.user.userDetails); // Get user details from Redux store
  const [triggerVideoFetch, setTriggerVideoFetch] = useState(false); // State to trigger video fetch
  const [loading, setLoading] = useState(false); // State to manage loading state

  useEffect(() => {
    // Function to fetch data of channel with id
    const fetchChannelData = async () => {
      try {
        const { data } = await axios.get(
          `https://youtube-clone-backend-jf4n.onrender.com/api/channel/${params.id}`
        );
        if (data) {
          setChannelData(data.channel); // Set channel data
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchChannelData();
  }, [params]);

  useEffect(() => {
    if (channelData) {
      fetchVideos(channelData?._id); // Fetch videos when channel data is available
    }
  }, [channelData, triggerVideoFetch]);

  // Function to trigger re-render of the component
  const triggerVideoFetching = () => {
    setTriggerVideoFetch(!triggerVideoFetch);
  };

  // Function to fetch videos
  const fetchVideos = async (channelId) => {
    setLoading(true); // Set loading state to true
    try {
      const { data } = await axios.get(
        channelId?`https://youtube-clone-backend-jf4n.onrender.com/api/video/channelVideos/${channelId}`:null
      );

      if (data) {
        setChannelVideos(data.videos); // Set channel videos
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <>
      {loading ? (
        <Loader /> // Show loader if loading
      ) : (
        <div className="main-channel-container">
          <div>
            {channelData && Object.keys(channelData).length >= 1 ? (
              <div>
                {/* Channel Banner */}
                <img
                  src={channelData?.channelBanner}
                  className="banner-image"
                  alt="channelBanner"
                />
                <div className="channel-info-container">
                  {/* Channel Logo */}
                  <img
                    src={channelData?.channelLogo}
                    className="channel-icon-image"
                    alt="channellogo"
                  />
                  <div className="description">
                    {/* Channel Name */}
                    <h2 className="channel-title-text">
                      {channelData?.channelName}
                    </h2>
                    {/* Channel Details */}
                    <p>Videos: {channelData?.videos?.length}</p>
                    <p>Subscribers: {channelData?.subscribers?.length}</p>
                    <p>Created At: {channelData?.createdAt?.split("T")[0]}</p>
                    <p>
                      {channelData?.description?.length >= 330
                        ? channelData?.description.slice(0, 330) + "..."
                        : channelData?.description}
                    </p>
                    <div className="actions-container">
                      {/* Upload Video Button for Channel Owner */}
                      {channelData?.owner === user?._id ? (
                        <>
                          <Link to="/uploadVideo" className="action-button">
                            Upload Video
                          </Link>
                        </>
                      ) : (
                        "Videos"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <h2>No Channel Found</h2>
            )}
            <hr />
            {/* Display video grid below */}
            <div className="video-box-container">
              {channelVideos && channelVideos.length >= 1 ? (
                channelVideos.map((item) => (
                  <ChannelVideo
                    triggerVideoFetching={triggerVideoFetching}
                    channelData={channelData}
                    key={item._id}
                    item={item}
                  />
                ))
              ) : (
                <h2>No videos to display</h2>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChannelDetail;
