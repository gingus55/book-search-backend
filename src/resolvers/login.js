const { AuthenticationError } = require("apollo-server");

const { User } = require("../models");
const { signToken } = require("../utils/auth");

const login = async (_, { input }, context) => {
  const userFromDB = await User.findOne({ email: input.email });

  if (!userFromDB) {
    console.log("[ERROR]: Failed to login | User does not exist");
    throw new AuthenticationError("Failed to login");
  }

  const isValidPassword = await userFromDB.isCorrectPassword(input.password);

  if (!isValidPassword) {
    console.log("[ERROR]: Failed to login | Incorrect password");
    throw new AuthenticationError("Failed to login");
  }

  return {
    token: signToken(userFromDB),
    user: userFromDB,
  };
};

module.exports = login;
