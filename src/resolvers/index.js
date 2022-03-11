const login = require("./login");
const addUser = require("./addUser");
const saveBook = require("./saveBook");
const removeBook = require("./removeBook");
const me = require("./me");

console.log(addUser);

const resolvers = {
  Query: {
    me,
  },
  Mutation: { login, addUser, saveBook, removeBook },
};

module.exports = resolvers;
