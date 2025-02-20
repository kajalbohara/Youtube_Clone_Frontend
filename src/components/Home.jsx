import axios from "axios";
import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import "./styles/Home.css";
import { toggleContext } from "../App";
import { useContext } from "react";

const Home = () => {
  const { sideBarToggle } = useContext(toggleContext); // Get isCollapse from Context
  const [videos, setVideos] = useState([]); // State to store all videos
  const [filteredData, setFilteredData] = useState(videos); // State to store filtered videos
  const [loading, setLoading] = useState(false); // State to manage loading state

  const categories = [
    "All",
    "Travel",
    "Fitness",
    "Education",
    "Movies",
    "Food",
    "Automobile",
    "Songs",
    "Finance",
    "Gaming",
    "Technology",
  ];

  const userChannel = useSelector((store) => store.userChannel?.userChannelDetails);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading state to true
      try {
        const { data } = await axios.get(
          "http://localhost:7000/api/video/"
        );
        if (data) {
          setVideos(data.videos); // Set videos data
          setFilteredData(data.videos); // Set filtered data
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Set loading state to false
      }
    };
    fetchData();
  }, []);

  // Handle category filter
  const handleFilter = (filteredItem) => {
    if (filteredItem === "All") {
      setFilteredData(videos); // Show all videos
    } else {
      setFilteredData(
        videos.filter(
          (item) => item.category.toLowerCase() === filteredItem.toLowerCase()
        )
      ); // Filter videos by category
    }
  };

  return (
    <>
      {/* Category */}
      <div className="category">
        {categories?.map((item) => (
          <span
            onClick={() => handleFilter(item)}
            key={item}
            className="category-item"
          >
            {item}
          </span>
        ))}
      </div>

      <div className={`video-container1${sideBarToggle ? "Toggle" : ""}`}>
        {loading ? (
          <Loader /> // Show loader if loading
        ) : (
          <>
            {filteredData && filteredData.length >= 1 ? (
              filteredData.map((item) => (
                <VideoCard
                  key={item._id}
                  videoId={item._id}
                  title={item.title}
                  channelId={item.channelId}
                  thumbnailUrl={item.thumbnailUrl}
                  views={item.views}
                  createdAt={item.createdAt}
                />
              ))
            ) : (
              <h2>No videos to display</h2> // Show message if no videos to display
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
