const postResolvers = require("./posts.js");
const userResolvers = require("./users.js");
const commentsResolver = require("./comments.js");

module.exports = {
  Query: {
    ...userResolvers.Query,
    ...postResolvers.Query,
    ...commentsResolver.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentsResolver.Mutation,
  },
};
