import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./styles/UserAccount.css";

const UserAccount = () => {
  const userDetails = useSelector((store) => store.user.userDetails); // Get user details from Redux store
  const userChannel = useSelector((store) => store.userChannel.userChannelDetails); // Get user channel details from Redux store
  const navigate = useNavigate();

  useEffect(() => {
    if (!userDetails || Object.keys(userDetails).length <= 0) {
      toast.error("Login required!"); // Show error message if user is not logged in
      navigate("/"); // Redirect to home
    }
  }, [userDetails, navigate]);

  return (
    <div className="account-container">
      <h2 className="section-title">Account Details</h2>
      <div className="account-box">
        {/* User avatar */}
        <img src={userDetails?.avatar} className="avatar-img" alt="avatar" />
        <div className="account-details">
          {/* User details */}
          <h4>Hello, {userDetails?.userName}</h4>
          <h4 className="email-info">Email: {userDetails?.email}</h4>
          <h4>Account Created: {userDetails?.createdAt?.split("T")[0]}</h4>
        </div>
      </div>

      <h4 className="section-title">Channels associated with your account</h4>
      <div className="account-box">
        {userChannel && Object.keys(userChannel).length >= 1 ? (
          <div key={userChannel._id} className="channel-container">
            {/* Channel logo */}
            <img
              src={userChannel?.channelLogo}
              className="channel-logo"
              alt="channel avatar"
            />
            <div className="channel-Details ">
              {/* Channel name */}
              <h2>{userChannel?.channelName}</h2>
            </div>
          </div>
        ) : (
          "You don't have any channel, you can create one."
        )}
      </div>
    </div>
  );
};

export default UserAccount;
