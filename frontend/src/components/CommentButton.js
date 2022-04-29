import React from "react";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
export default function CommentButton(props) {
  const commentPost = () => {
    console.log("Comment Post!!!");
  };
  return (
    <div>
      <button className="btn btn-primary" onClick={commentPost}>
        <ModeCommentOutlinedIcon />

        <div className="m-2">{props.commentCount}</div>
      </button>
    </div>
  );
}
