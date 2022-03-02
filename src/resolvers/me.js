const { AuthenticationError } = require("apollo-server");
const { User } = require("../models");

const me = async (_, args, context) => {
  try {
    if (!context.user) {
      throw new AuthenticationError(
        "You are not authorised to perform this operation"
      );
    }

    const { id } = context.user;
    const me = await User.findById(id).populate("savedBooks");

    return me;
  } catch (error) {
    console.log(`[ERROR]: Failed to find myself | ${error.message}`);
  }
};

module.exports = me;
