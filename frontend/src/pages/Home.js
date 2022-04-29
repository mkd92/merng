import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "graphql-tag";
import Card from "../components/Card";

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      username
      createdAt
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
export default function Home() {
  const { loading, data, error } = useQuery(FETCH_POSTS_QUERY);
  var posts = [];
  if (loading) {
  }
  if (data) {
    posts = data.getPosts;
  }
  if (error) {
    console.log(error);
  }
  return (
    <div className="container flex flex-col items-center w-4/5 ">
      <div className="font-sans text-2xl font-semibold tracking-wider">
        Recent Posts
      </div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        posts && posts.map((post) => <Card key={post.id} post={post} />)
      )}
    </div>
  );
}
