import React from "react";
// import { useQuery } from "@apollo/react-hooks";
// import { graphql as gql } from "graphql";

// const FETCH_POSTS_QUERY = gql`
//   {
//     getPosts {
//       id
//       body
//       createdAt
//       likeCount
//       likes {
//         username
//       }
//       commentCount
//       comments {
//         id
//         username
//         createdAt
//         body
//       }
//     }
//   }
// `;
export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
}
