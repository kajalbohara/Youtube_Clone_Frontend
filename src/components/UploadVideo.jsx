import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./styles/UploadVideo.css";

const UploadVideo = () => {
  const navigate = useNavigate();
  const userChannel = useSelector((store) => store.userChannel.userChannelDetails); // Get user channel details from Redux store
  const user = useSelector((store) => store.user.userDetails); // Get user details from Redux store
  const jwtToken = useSelector((store) => store.user.token); // Get user token from Redux store

  useEffect(() => {
    if (!userChannel || Object.keys(userChannel).length < 1) {
      navigate("/"); // Redirect to home if user does not have a channel
    }
  }, [userChannel, navigate]);

  const [formData, setFormData] = useState({
    title: "",
    thumbnailUrl: "",
    description: "",
    videoUrl: "",
    category: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let videoData = {
      ...formData,
      uploader: user?._id,
      channelId: userChannel?._id,
    };

    try {
      let result = await axios.post(
        "http://localhost:7000/api/video/addVideo",
        videoData,
        {
          headers: {
            Authorization: `JWT ${jwtToken}`,
          },
        }
      );
      if (result) {
        toast.success("Video added successfully");
        setFormData({
          title: "",
          thumbnailUrl: "",
          description: "",
          category: "",
          videoUrl: "",
        });
        navigate(`/channel/${userChannel?._id}`); // Redirect to channel page
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="upload-video-container">
      <form onSubmit={handleFormSubmit} className="upload-form">
        <h2 className="form-title">Video Upload</h2>

        {/* Video Thumbnail */}
        <img
          className="video-thumbnail"
          src="https://png.pngtree.com/png-vector/20190215/ourmid/pngtree-play-video-icon-graphic-design-template-vector-png-image_530837.jpg"
          alt="video"
        />

        <label htmlFor="title">Video Title</label>
        <input
          id="title"
          type="text"
          required
          value={formData.title}
          name="title"
          onChange={handleChange}
        />

        <label htmlFor="thumbnailUrl">Thumbnail URL</label>
        <input
          id="thumbnailUrl"
          type="url"
          required
          value={formData.thumbnailUrl}
          name="thumbnailUrl"
          onChange={handleChange}
        />

        <label htmlFor="videoUrl">Video URL</label>
        <input
          id="videoUrl"
          type="url"
          required
          value={formData.videoUrl}
          name="videoUrl"
          onChange={handleChange}
        />

        <label htmlFor="category">Category</label>
        <select id="category" name="category" required value={formData.category} onChange={handleChange}>
          <option value="" disabled>Select a category</option>
          <option value="Travel">Travel</option>
          <option value="Fitness">Fitness</option>
          <option value="Education">Education</option>
          <option value="Movies">Movies</option>
          <option value="Food">Food</option>
          <option value="Automobile">Automobile</option>
          <option value="Songs">Songs</option>
          <option value="Finance">Finance</option>
          <option value="Gaming">Gaming</option>
          <option value="Technology">Technology</option>
        </select>

        <label htmlFor="description">Video Description</label>
        <textarea
          id="description"
          rows={5}
          required
          value={formData.description}
          name="description"
          onChange={handleChange}
        />

        <button type="submit" className="upload-button">Upload</button>
      </form>
    </div>
  );
};

export default UploadVideo;
