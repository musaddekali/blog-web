import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import "./post-card.css";
import { useGlobalContext } from "../../../context/context";

const PostCard = ({ post }) => {
  const { id, title, img, createdAt, desc } = post;
  const { user, userData, authorPageURL, handlePostDelete } =
    useGlobalContext();
  const { name, profileImg } = userData;

  return (
    <article className="post-card card">
      <div className="card-img">
        <img src={img} alt="post" className="img-fill img-cover" />
      </div>
      <div className="card-body">
        <h3 className="card-title">
          <Link to={`/post-details/${id}`}>{title}</Link>
        </h3>
        <p className="card-text">{desc.substring(0, 120)}...</p>
      </div>
      <div className="card-footer">
        {user && (
          <Link to={`/${authorPageURL}`} className="card-footer-user">
            {profileImg ? (
              <img src={profileImg} alt="user" />
            ) : (
              <div className="author-info-name-letter">
                {name && name.charAt(0)}
              </div>
            )}
            <span>{name}</span>
          </Link>
        )}
        <div className="card-footer-date">
          <Moment fromNow>{createdAt.toDate()}</Moment>
        </div>
        <div className="user-control">
          <Link title="Edit this post" to={`/update-post/${id}`}>
            <FaEdit />
          </Link>
          <button title="Delete this post" onClick={() => handlePostDelete("posts", id)} className="btn">
            <FaTrash />
          </button>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
