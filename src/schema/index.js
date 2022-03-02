const {gql}= require ("apollo-server-express");

const typeDefs = gql'

type User {
    _id: ID!
    username: String!
    email:String!
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
    token: String
    user: User
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

}

input

type Mutation {
    login(email: String, Id: ID): Auth
    addUser()
    saveBook
    removeBook(bookId: ID!): User
}
';

module.exports = typeDefs;