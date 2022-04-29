import React from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
export default function LikeButton(props) {
  const likePost = () => {
    console.log("Like Post!!!");
  };
  return (
    <div>
      <button className="btn btn-primary" onClick={likePost}>
        <FavoriteBorderOutlinedIcon />

        <div className="m-2">{props.likeCount}</div>
      </button>
    </div>
  );
}
