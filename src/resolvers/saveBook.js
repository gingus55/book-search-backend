const { AuthenticationError } = require("apollo-server");
const { User } = require("../models");

const saveBook = async (_, { input }, context) => {
  try {
    if (!context.user) {
      throw new AuthenticationError(
        "You are still not authorised to perform this operation"
      );
    }

    const { bookId, authors, title, description, image, link } = input;

    const updatedUser = await User.findOneAndUpdate(
      { _id: context.user.id },
      {
        $addToSet: {
          savedBooks: { bookId, authors, title, description, image, link },
        },
      },
      { new: true, runValidators: true }
    );

    return updatedUser;
  } catch (error) {
    console.log(`[ERROR]: Failed to find myself | ${error.message}`);
  }
};

module.exports = saveBook;

