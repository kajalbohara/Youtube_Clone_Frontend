import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import timeAgo from "./utils/timeAgo";
import "./styles/Comment.css";

const Comment = ({ triggerCommentFetch, createdAt, owner, description, id, video }) => {
  const [commentOwner, setCommentOwner] = useState({}); // State to store comment owner data
  const [isEditing, setIsEditing] = useState(false); // State to manage editing mode
  const [editedDescription, setEditedDescription] = useState(description); // State to store edited description
  const user = useSelector((store) => store.user.userDetails); // Get user details from Redux store
  const [op, setOp] = useState(false); // State to manage options menu visibility

  useEffect(() => {
    // Function to fetch comment owner data
    const fetchOwner = async () => {
      try {
        const { data } = await axios.get(
          `https://youtube-clone-backend-jf4n.onrender.com/api/users/${owner}`
        );
        if (data) {
          setCommentOwner(data.user); // Set comment owner data
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchOwner();
  }, []);

  // Function to delete comment
  const handleDelete = async () => {
    try {
      const result = await axios.delete(
        `https://youtube-clone-backend-jf4n.onrender.com/api/comment/deleteComment/${id}/${video}/${user?._id}`
      );
      if (result) {
        toast.success("Comment deleted successfully"); // Show success message
        triggerCommentFetch(); // Trigger re-fetching of comments
      }
    } catch (error) {
      toast.error(error.data.message); // Show error message
    } finally {
      setOp(false); // Close options menu
    }
  };

  // Function to update comment
  const handleUpdate = async () => {
    try {
      const result = await axios.put(
        `https://youtube-clone-backend-jf4n.onrender.com/api/comment/updateComment/${id}/${video}/${user?._id}`,
        { description: editedDescription }
      );
      if (result) {
        toast.success("Comment updated successfully"); // Show success message
        triggerCommentFetch(); // Trigger re-fetching of comments
      }
    } catch (error) {
      toast.error(error.data.message); // Show error message
    } finally {
      setOp(false); // Close options menu
      setIsEditing(false); // Exit editing mode
    }
  };

  return (
    <div className="comment-container">
      <div className="comment-content">
        <div className="comment-mbl">
          {/* Comment owner avatar */}
          <img className="comment-avatar" src={commentOwner?.avatar} alt="avatar" />
          <p>
            {/* Comment owner name and time ago */}
            {commentOwner?.userName} • <span className="comment-time">{timeAgo(createdAt)}</span>
          </p>
        </div>
        <div className="comment-data">
          <div className="comment-info">
            {/* Comment description or input for editing */}
            {isEditing ? (
              <input
                className="comment-input"
                onChange={(e) => setEditedDescription(e.target.value)}
                type="text"
                value={editedDescription}
                required
              />
            ) : (
              <p id="comment-desc">{description}</p>
            )}
          </div>
          <div className="comment-actions">
            {/* Like, Dislike, and Reply buttons */}
            <button><BiLike /></button>
            <button><BiDislike /></button>
            <button>Reply</button>
          </div>
        </div>
      </div>

      {/* Options menu for comment owner */}
      {user?._id === commentOwner?._id && (
        <div className="comment-options">
          <HiOutlineDotsVertical className="options-icon" onClick={() => setOp(!op)} />
          <ul className={`options-menu ${op ? "show" : ""}`}>
            {isEditing ? (
              <li onClick={handleUpdate} className="option-item">
                <CiEdit /> Save
              </li>
            ) : (
              <li onClick={() => { setOp(false); setIsEditing(true); }} className="option-item">
                <CiEdit /> Edit
              </li>
            )}
            <li onClick={handleDelete} className="option-item">
              <MdDeleteOutline /> Delete
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Comment;
