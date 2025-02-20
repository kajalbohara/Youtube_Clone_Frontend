import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { setUserChannelDetails } from "./utils/userChannelSlice";
import "./styles/UpdateChannel.css"

const UpdateChannel = () => {
  const params = useParams(); // Get URL parameters
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userChannel = useSelector((store) => store.userChannel.userChannelDetails); // Get user channel details from Redux store
  const user = useSelector((store) => store.user.userDetails); // Get user details from Redux store
  const jwtToken = useSelector((store) => store.user.token); // Get user token from Redux store

  const [formData, setFormData] = useState({
    channelLogo: "",
    channelName: "",
    description: "",
    channelBanner: "",
  });

  useEffect(() => {
    if (!userChannel || Object.keys(userChannel).length < 1) {
      navigate("/"); // Redirect to home if user does not have a channel
    } else {
      fetchChannelData(); // Fetch channel data
    }
  }, []);

  // Function to fetch channel data
  const fetchChannelData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:7000/api/channel/${params.id}`
      );
      if (data) {
        setFormData({
          channelLogo: data?.channel?.channelLogo || "",
          channelName: data?.channel?.channelName || "",
          description: data?.channel?.description || "",
          channelBanner: data?.channel?.channelBanner || "",
        });
      }
    } catch (error) {
      console.error("Error fetching channel data:", error);
    }
  };

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
        `http://localhost:7000/api/channel/updateChannel/${params.id}/${user._id}`,
        formData,
        {
          headers: {
            Authorization: `JWT ${jwtToken}`,
          },
        }
      );
      if (result) {
        dispatch(setUserChannelDetails(result.data.channel)); // Update user channel details in Redux store
        toast.success("Channel updated");
        navigate(`/channel/${userChannel._id}`); // Redirect to channel page
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="update-channel-container">
      <form onSubmit={handleFormSubmit} className="update-channel-form">
        <h2 className="form-title">How you will appear</h2>

        {/* Channel Logo */}
        <img
          className="channel-logo"
          src={
            formData?.channelLogo ||
            "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
          }
          alt="Channel Logo"
        />

        <label htmlFor="channelName" className="form-label">
          Channel Name
        </label>
        <input
          id="channelName"
          type="text"
          required
          value={formData.channelName}
          name="channelName"
          onChange={handleChange}
          className="form-input"
        />

        <label htmlFor="channelLogo" className="form-label">
          Channel Logo
        </label>
        <input
          id="channelLogo"
          type="url"
          required
          value={formData.channelLogo}
          name="channelLogo"
          onChange={handleChange}
          className="form-input"
        />

        <label htmlFor="channelBanner" className="form-label">
          Channel Banner
        </label>
        <input
          id="channelBanner"
          type="url"
          required
          value={formData.channelBanner}
          name="channelBanner"
          onChange={handleChange}
          className="form-input"
        />

        <label htmlFor="description" className="form-label">
          Channel Description
        </label>
        <input
          id="description"
          type="text"
          required
          value={formData.description}
          name="description"
          onChange={handleChange}
          className="form-input"
        />

        <button type="submit" className="update-button">
          Update Channel
        </button>
      </form>
    </div>
  );
};

export default UpdateChannel;
