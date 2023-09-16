const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Book {
    bookId: ID
    title: String
    authors: String
    description: String
    image: String
    link: String
}

type User {
    id: ID
    username: String
    email: String
    savedBooks: [Book]
}

type Query {
    users: [User]
  }

`
module.exports = typeDefs;