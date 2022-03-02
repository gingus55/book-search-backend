const { User } = require("../models");
const { AuthenticationError } = require("apollo-server");

const removeBook = async (_, { bookId }, context) => {
  try {
    if (!context.user) {
      throw new AuthenticationError(
        "You are not authorised to perform this operation"
      );
    }

    const user = await User.findByIdAndUpdate(
      context.user.id,
      {
        $pull: {
          savedBooks: bookId,
        },
      },
      {
        new: true,
      }
    ).populate("savedBooks");

    return user;
  } catch (error) {
    console.log(
      `[ERROR]: Failed to remove book from library | ${error.message}`
    );
  }
};

module.exports = removeBook;
