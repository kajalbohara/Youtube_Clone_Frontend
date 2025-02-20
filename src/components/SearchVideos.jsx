import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SearchVideoView from "./SearchVideoView";
import "./styles/SearchVideos.css";

const SearchVideos = () => {
  const [videoResults, setVideoResults] = useState([]); // State to store search results
  const params = useParams(); // Get URL parameters

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:7000/api/video/search/${params.searchItem}`
        );
        if (data) {
          setVideoResults(data.videos); // Set search results
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.message); // Show error message
      }
    };
    fetchVideos();
  }, [params]);

  return (
    <div className="search-videos__container">
      {/* Display search results heading */}
      <h2 className="search-videos__heading">Search Results for: "{params.searchItem}"</h2>
      <div className="search-videos__list">
        {videoResults && videoResults.length >= 1 ? (
          videoResults.map((item) => <SearchVideoView key={item._id} item={item} />)
        ) : (
          <h2 className="search-videos__no-results">No videos matched your search</h2> // Show message if no results
        )}
      </div>
    </div>
  );
};

export default SearchVideos;
