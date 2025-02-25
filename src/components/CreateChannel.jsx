import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setUserState } from "./utils/userSlice";
import "./styles/CreateChannel.css";

const CreateChannel = () => {
  const dispatch = useDispatch();
  const userChannel = useSelector(
    (store) => store.userChannel.userChannelDetails
  );

  const user = useSelector((store) => store.user.userDetails); // Get user details from Redux store
  const jwtToken = useSelector((store) => store.user.token); // Get user token from Redux store

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    channelLogo: "",
    channelName: "",
    description: "",
    channelBanner: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Function to create a channel
  const handleFormSubmit = async (e) => {
    console.log("form data", formData);
    e.preventDefault();
    let channelData = { ...formData, owner: user?._id };
    try {
      let result = await axios.post(
        "https://youtube-clone-backend-jf4n.onrender.com/api/channel/createChannel",
        channelData,
        {
          headers: {
            Authorization: `JWT ${jwtToken}`,
          },
        }
      );
      if (result) {
        toast.success("Channel created"); // Show success message
        fetchCurrentUser(); // Fetch current user data
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message); // Show error message
    }
  };

  // Function to fetch current user
  const fetchCurrentUser = async () => {
    try {
      let { data } = await axios.get(
        `https://youtube-clone-backend-jf4n.onrender.com/api/users/${user?._id}`
      );

      if (data) {
        dispatch(setUserState(data?.user)); // Update user state in Redux store
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message); // Show error message
    }
  };

  useEffect(() => {
    if (userChannel && Object.keys(userChannel).length >= 1) {
      navigate("/"); // Redirect to home if user already has a channel
    }
  }, []);

  return (
    <div className="create-channel-container">
      <form onSubmit={handleFormSubmit} className="create-channel-form">
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

        <label htmlFor="channelName">Channel Name</label>
        <input
          id="channelName"
          type="text"
          required
          value={formData.channelName}
          name="channelName"
          onChange={handleChange}
        />

        <label htmlFor="channelLogo">Channel Logo (URL)</label>
        <input
          id="channelLogo"
          type="url"
          required
          value={formData.channelLogo}
          name="channelLogo"
          onChange={handleChange}
        />

        <label htmlFor="channelBanner">Channel Banner (URL)</label>
        <input
          id="channelBanner"
          type="url"
          required
          value={formData.channelBanner}
          name="channelBanner"
          onChange={handleChange}
        />

        <label htmlFor="description">Channel Description</label>
        <input
          id="description"
          type="text"
          required
          value={formData.description}
          name="description"
          onChange={handleChange}
        />

        <button type="submit" className="submit-btn">
          Create Channel
        </button>
      </form>
    </div>
  );
};

export default CreateChannel;
