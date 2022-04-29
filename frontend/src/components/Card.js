import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";
export default function Card(props) {
  const { body, createdAt, id, username, likeCount, commentCount } = props.post;
  return (
    <div className="p-4 m-4 shadow-xl card card-compact card-main bg-base-100">
      <div className="card-body">
        <h2 className="card-title">{username}</h2>
        <Link to={`/posts/${id}`}>
          <p>{body}</p>
        </Link>
        <div className="justify-end card-actions">
          <p>{moment(createdAt).fromNow()}</p>
          <LikeButton likeCount={likeCount}></LikeButton>
          <CommentButton commentCount={commentCount} />
        </div>
      </div>
    </div>
  );
}
