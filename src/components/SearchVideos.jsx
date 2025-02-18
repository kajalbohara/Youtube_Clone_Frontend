import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SearchVideoView from "./SearchVideoView";
import "./styles/SearchVideos.css";

const SearchVideos = () => {
  const [videoResults, setVideoResults] = useState([]);
  const params = useParams();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:7000/api/video/search/${params.searchItem}`
        );
        if (data) {
          setVideoResults(data.videos);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.message);
      }
    };
    fetchVideos();
  }, [params]);

  return (
    <div className="search-results-container">
      <h2 className="search-results-heading">Search Results for: "{params.searchItem}"</h2>
      <div className="search-results-list">
        {videoResults && videoResults.length >= 1 ? (
          videoResults.map((item) => <SearchVideoView key={item._id} item={item} />)
        ) : (
          <h2 className="search-no-results">No videos matched your search</h2>
        )}
      </div>
    </div>
  );
};

export default SearchVideos;
