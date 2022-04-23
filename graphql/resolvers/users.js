const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const { SECRET_KEY } = require("../../config.js");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../util/validators");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const user = await User.findOne({ username });
      if (!user) {
        errors.general = "User Not Found";
        throw new UserInputError("User Not Found", { errors });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong Credentials";
        throw new UserInputError("Wrong Credentials", { errors });
      }
      const token = generateToken(user);
      return {
        username: user.username,
        password: user.password,
        email: user.email,
        createdAt: user.createdAt,
        id: user._id,
        token,
      };
    },
    async register(parent, args) {
      //TODO:Validate User Data
      const { valid, errors } = validateRegisterInput(
        args.registerInput.username,
        args.registerInput.email,
        args.registerInput.password,
        args.registerInput.confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      //TODO:Make Sure user Doesnt already exist
      const user = await User.findOne({
        username: args.registerInput.username,
      });
      if (user) {
        throw new UserInputError("Username is taken", {
          errors: { username: "this username is taken" },
        });
      }
      //hash password and create auth token
      password = await bcrypt.hash(args.registerInput.password, 12);
      const date = new Date().toISOString();
      const newUser = new User({
        email: args.registerInput.email,
        username: args.registerInput.username,
        password: password,
        createdAt: date,
      });
      const res = await newUser.save();
      const token = generateToken(res);

      return {
        username: res.username,
        password: res.password,
        email: res.email,
        createdAt: res.createdAt,
        id: res._id,
        token,
      };
    },
  },
};
