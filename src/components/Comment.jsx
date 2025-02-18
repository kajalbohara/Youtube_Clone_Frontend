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
  const [commentOwner, setCommentOwner] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);
  const user = useSelector((store) => store.user.userDetails);
  const [op, setOp] = useState(false);

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:7000/api/users/${owner}`
        );
        if (data) {
          setCommentOwner(data.user);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchOwner();
  }, []);

  const handleDelete = async () => {
    try {
      const result = await axios.delete(
        `http://localhost:7000/api/comment/deleteComment/${id}/${video}/${user?._id}`
      );
      if (result) {
        toast.success("Comment deleted successfully");
        triggerCommentFetch();
      }
    } catch (error) {
      toast.error(error.data.message);
    } finally {
      setOp(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const result = await axios.put(
        `http://localhost:7000/api/comment/updateComment/${id}/${video}/${user?._id}`,
        { description: editedDescription }
      );
      if (result) {
        toast.success("Comment updated successfully");
        triggerCommentFetch();
      }
    } catch (error) {
      toast.error(error.data.message);
    } finally {
      setOp(false);
      setIsEditing(false);
    }
  };

  return (
    <div className="comment-main">
      <div className="comment-content">
        <img className="comment-avatar" src={commentOwner?.avatar} alt="avatar" />
        <div className="comment-data">
          <h2>
            {commentOwner?.userName} • <span className="comment-time">{timeAgo(createdAt)}</span>
          </h2>

          {isEditing ? (
            <input
              className="comment-input"
              onChange={(e) => setEditedDescription(e.target.value)}
              type="text"
              value={editedDescription}
              required
            />
          ) : (
            <p>{description}</p>
          )}

          <div className="comment-actions">
            <button><BiLike /></button>
            <button><BiDislike /></button>
            <button>Reply</button>
          </div>
        </div>
      </div>

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
