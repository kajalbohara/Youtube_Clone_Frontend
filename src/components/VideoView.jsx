import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BiLike, BiDislike } from "react-icons/bi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Comment from "./Comment";
import timeAgo from "./utils/timeAgo";
import formatNumber from "./utils/formatNumber";
import "./styles/VideoView.css";

const VideoView = () => {
  const { id: video } = useParams();
  const [videoData, setVideoData] = useState({});
  const [comments, setComments] = useState([]);
  const [channelData, setChannelData] = useState({});
  const [channelVideos, setChannelVideos] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [comment, setComment] = useState("");
  const [commentTrigger, setCommentTrigger] = useState(false);
  const user = useSelector((store) => store.user.userDetails);
  const token = useSelector((store) => store.user.token);

  // Like video
  const handleLike = async () => {
    if (!user || Object.keys(user).length < 1) {
      return toast.error("Login first");
    }
    try {
      const uId = user._id;
      const { data } = await axios.put(
        `http://localhost:7000/api/video/likeVideo/${video}`,
        { uId },
        {
          headers: { Authorization: `JWT ${token}` },
        }
      );
      if (data) {
        toast.success("Video liked");
        setVideoData((prev) => ({
          ...prev,
          likes: data.video.likes,
          dislikes: data.video.dislikes,
        }));
      }
    } catch (error) {
      toast.error(error.response.data.message);
       console.log(error);
    }
  };

  // Dislike video
  const handleDisLike = async () => {
    if (!user || Object.keys(user).length < 1) {
      return toast.error("Login first");
    }
    try {
      const uId = user._id;
      const { data } = await axios.put(
        `http://localhost:7000/api/video/disLikeVideo/${video}`,
        { uId },
        {
          headers: { Authorization: `JWT ${token}` },
        }
      );
      if (data) {
        toast.success("Video disliked");
        setVideoData((prev) => ({
          ...prev,
          dislikes: data.video.dislikes,
          likes: data.video.likes,
        }));
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    // Fetch video details
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:7000/api/video/${video}`
      );
      if (data) {
        setVideoData(data.video);
        fetchChannelData(data.video.channelId);
        fetchChannelVideos(data.video.channelId);
        if (data.video.videoUrl) {
          // Assuming videoUrl has a query parameter "v=" (like YouTube URLs)
          const parts = data.video.videoUrl.split("v=");
          setVideoUrl(parts[1] ? parts[1] : "");
        }
      }
    };
    fetchData();
  }, [video]);

  useEffect(() => {
    if (videoData && videoData._id) {
      fetchVideoComments();
    }
  }, [videoData, commentTrigger]);

  // Fetch channel videos
  const fetchChannelVideos = async (id) => {
    try {
      const { data } = await axios.get(
        `http://localhost:7000/api/video/channelVideos/${id}`
      );
      if (data) {
        setChannelVideos(data.videos);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch channel data
  const fetchChannelData = async (cId) => {
    const { data } = await axios.get(
      `http://localhost:7000/api/channel/${cId}`
    );
    if (data) {
      setChannelData(data.channel);
    }
  };

  // Fetch video comments
  const fetchVideoComments = async () => {
    const { data } = await axios.get(
      `http://localhost:7000/api/comment/videoComments/${video}`
    );
    if (data) {
      setComments(data.comments);
    }
  };

  // Toggle comment re-fetch
  const triggerCommentFetch = () => {
    setCommentTrigger((prev) => !prev);
  };

  // Handle adding a comment
  const handleComment = async () => {
    if (comment.trim() === "") {
      return toast.error("Comment cannot be empty!");
    }
    if (!user || Object.keys(user).length < 1) {
      return toast.error("Login required");
    }
    const commentData = {
      video: videoData._id,
      owner: user._id,
      description: comment,
    };
    try {
      const response = await axios.post(
        "http://localhost:7000/api/comment/addComment",
        commentData
      );
      if (response.data) {
        toast.success("Comment added");
        fetchVideoComments();
        setComment("");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  // Handle channel subscription
  const handleSubscribe = async () => {
    if (!user || Object.keys(user).length < 1) {
      return toast.error("Login first");
    }
    try {
      const { data } = await axios.put(
        `http://localhost:7000/api/channel/subscribeChannel/${channelData._id}/${user._id}`,
        {},
        { headers: { Authorization: `JWT ${token}` } }
      );
      if (data) {
        toast.success("Channel subscribed");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="video-view-root">
      {/* Left Section: Video, Details, and Comments */}
      <div className="video-left-section">
        <iframe
          className="video-iframe-element"
          src={`https://www.youtube.com/embed/${videoUrl}?autoplay=1&rel=0`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>

        <div className="video-operations">
        <h2 id="video-tit">{`${videoData?.title}`} </h2>
          <div className="video-left-group">
            <Link to={`/channel/${channelData._id}`} className="video-channel-link">
              <img
                className="video-channel-image"
                src={channelData.channelLogo}
                alt="Channel logo"
              />
              <h2 className="video-channel-name">{channelData.channelName}</h2>
            </Link>
            <button onClick={handleSubscribe} className="video-subscribe-button">
              subscribe
            </button>
          </div>
          <div className="video-actions">
            <button onClick={handleLike} className="video-action-button">
              <BiLike />
              <span>|</span>
              {videoData.likes ? videoData.likes.length : 0}
            </button>
            <button onClick={handleDisLike} className="video-action-button">
              <BiDislike />
              <span>|</span>
              {videoData.dislikes ? videoData.dislikes.length : 0}
            </button>
            <button className="video-action-button">save</button>
          </div>
        </div>

        <div className="video-comments-section">
          <div className="video-comments-header">
            <h2>{formatNumber(videoData.views)} Views •</h2>
            <h2>{timeAgo(videoData.createdAt)}</h2>
          </div>
          <p className="video-comment-text">{videoData.description}</p>
        </div>

        <div className="video-add-comment">
          <input
            type="text"
            name="comment"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            placeholder="comment here"
          />
          <button onClick={handleComment}>Comment</button>
        </div>

        <div className="video-comments-list">
          {comments && comments.length > 0
            ? comments.map((item) => (
                <Comment
                  triggerCommentFetch={triggerCommentFetch}
                  video={video}
                  key={item._id}
                  id={item._id}
                  createdAt={item.createdAt}
                  owner={item.owner}
                  description={item.description}
                />
              ))
            : "No comments to display"}
        </div>
      </div>

      {/* Right Section: Related Videos */}
      <div className="video-side-view">
        <h2 className="video-side-view-title">Channel related videos</h2>
        <div className="video-side-videos-list">
          {channelVideos && channelVideos.length > 0
            ? channelVideos.map((item) => (
                <Link to={`/video/${item._id}`} key={item._id} className="video-box">
                  <img
                    className="video-box-thumbnail"
                    src={item.thumbnailUrl}
                    alt="video thumbnail"
                  />
                  <div className="video-box-details">
                    <h2>
                      {item.title.length > 55
                        ? item.title.slice(0, 55) + "..."
                        : item.title}
                    </h2>
                    <h2>{channelData.channelName}</h2>
                    <h2>
                      {formatNumber(item.views)} • {timeAgo(item.createdAt)}
                    </h2>
                  </div>
                </Link>
              ))
            : "No videos related to channel"}
        </div>
      </div>
    </div>
  );
};

export default VideoView;
