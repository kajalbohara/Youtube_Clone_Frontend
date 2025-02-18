import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./styles/UserAccount.css";

const UserAccount = () => {
  const userDetails = useSelector((store) => store.user.userDetails);
  const userChannel = useSelector((store) => store.userChannel.userChannelDetails);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userDetails || Object.keys(userDetails).length <= 0) {
      toast.error("Login required!");
      navigate("/");
    }
  }, [userDetails, navigate]);

  return (
    <div className="user-account-container">
      <h2 className="user-section-title">Account Details</h2>
      <div className="user-account-box">
        <img src={userDetails?.avatar} className="user-avatar-img" alt="avatar" />
        <div className="user-account-details">
          <h4>Hello, {userDetails?.userName}</h4>
          <h4 className="user-email-info">Email: {userDetails?.email}</h4>
          <h4>Account Created: {userDetails?.createdAt?.split("T")[0]}</h4>
        </div>
      </div>

      <h4 className="user-section-title">Channels associated with your account</h4>
      <div className="user-account-box">
        {userChannel && Object.keys(userChannel).length >= 1 ? (
          <div key={userChannel._id} className="user-channel-container">
            <img
              src={userChannel?.channelLogo}
              className="user-channel-logo"
              alt="channel avatar"
            />
            <div className="user-channel-details">
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
