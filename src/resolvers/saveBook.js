const { AuthenticationError } = require("apollo-server");
const { User } = require("../models");

const saveBook = async (_, { book }, context) => {
  try {
    if (!context.user) {
      throw new AuthenticationError(
        "You are not authorised to perform this operation"
      );
    }

    const { bookId, authors, title, description, image, link } = book;

    const updatedUser = await User.findOneAndUpdate(
      { _id: context.user.id },
      {
        $addToSet: {
          savedBooks: bookId,
          authors,
          title,
          description,
          image,
          link,
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
// async saveBook({ user, body }, res) {
//     console.log(user);
//     try {
//       const updatedUser = await User.findOneAndUpdate(
//         { _id: user._id },
//         { $addToSet: { savedBooks: body } },
//         { new: true, runValidators: true }
//       );
//       return res.json(updatedUser);
//     } catch (err) {
//       console.log(err);
//       return res.status(400).json(err);
//     }
//   },
