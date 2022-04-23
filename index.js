const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
// const User = require("./models/User");
//
const { MONGODB } = require("./config.js");
const resolvers = require("./graphql/resolvers");
//
const typeDefs = require("./graphql/typeDefs.js");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});
mongoose
  .connect(MONGODB, { useNewURLParser: true })
  .then(() => {
    console.log(`MongoDB Connected`);

    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server Running at ${res.url}`);
  });
