const { User } = require("../models");
const { signToken } = require("../utils/auth");

const addUser = async (_, { input }) => {
  const newUser = await User.create(input);
  console.log(newUser);
  return {
    token: signToken(newUser),
    user: newUser,
  };
};

module.exports = addUser;
