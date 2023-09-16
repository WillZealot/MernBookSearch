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
    getUsers: [User]
  }

type Query {
  getSingleUser(id: ID!): User
}  
  
type Mutation {
createUser(username: String!, email: String!, password: String!): User
removeBook(bookId: ID!): Book
  }
`
module.exports = typeDefs;