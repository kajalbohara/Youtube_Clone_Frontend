import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./styles/UpdateVideoForm.css";

const UpdateVideoForm = () => {
  const params = useParams(); // Get URL parameters
  const navigate = useNavigate();
  const userChannel = useSelector((store) => store.userChannel.userChannelDetails); // Get user channel details from Redux store
  const user = useSelector((store) => store.user.userDetails); // Get user details from Redux store
  const jwtToken = useSelector((store) => store.user.token); // Get user token from Redux store

  const [formData, setFormData] = useState({
    title: "",
    thumbnailUrl: "",
    description: "",
    category: "",
    videoUrl: "",
  });

  useEffect(() => {
    // Function to fetch video data
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://youtube-clone-backend-jf4n.onrender.com/api/video/${params.id}`
        );

        if (data.video.uploader !== user._id) {
          navigate("/");
          toast.error("Unauthorized access!");
        }

        if (data) {
          setFormData({
            title: data.video.title || "",
            thumbnailUrl: data.video.thumbnailUrl || "",
            category: data.video.category || "",
            description: data.video.description || "",
            videoUrl: data.video.videoUrl || "",
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Error fetching video details.");
      }
    };

    fetchData();
  }, [params, user._id, navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      let result = await axios.put(
        `https://youtube-clone-backend-jf4n.onrender.com/api/video/updateVideo/${params.id}/${userChannel?._id}/${user?._id}`,
        formData,
        {
          headers: {
            Authorization: `JWT ${jwtToken}`,
          },
        }
      );

      if (result) {
        toast.success("Video updated successfully");
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
      toast.error(error?.response?.data?.message || "Error updating video.");
    }
  };

  return (
    <div className="update-video-container">
      <form onSubmit={handleFormSubmit} className="update-video-form">
        <h2 className="form-title">Edit Video</h2>

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

        <button type="submit" className="save-button">Save</button>
      </form>
    </div>
  );
};

export default UpdateVideoForm;
