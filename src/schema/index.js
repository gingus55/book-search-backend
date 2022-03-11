const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: ID!
    authors: [String]!
    title: String!
    description: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User!
  }

  type Query {
    me: User
  }

  input UserInput {
    email: String!
    password: String!
  }

  input AddUserInput {
    username: String!
    email: String!
    password: String!
  }

  input SaveBookInput {
    authors: [String]
    description: String
    title: String
    bookId: String
    image: String
    link: String
  }

  type Mutation {
    login(input: UserInput!): Auth
    addUser(input: AddUserInput!): Auth
    saveBook(input: SaveBookInput!): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
