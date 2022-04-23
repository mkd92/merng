const Post = require("../../models/Post.js");
const { AuthenticationError, UserInputError } = require("apollo-server");

const checkAuth = require("../../util/check-auth");

module.exports = {
  Query: {},
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context);
      if (body.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: { body: "Body Must not be empty" },
        });
      }
      const post = await Post.findById(postId);
      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else {
        throw new UserInputError("Post not Found ");
      }
    },
    deleteComment: async (_, { postId, commentId }, context) => {
      const { username } = checkAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);
        if (post.comments[commentIndex].username === username) {
          //   console.log(commentIndex);
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("Action not Allowed");
        }
      } else {
        throw new UserInputError("Post not found");
      }
    },
  },
};
