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
    password: String
    savedBooks: [Book]
}

type Query {

    getUsers: [User]
    getSingleUser(id: ID!): User
  } 

  type AuthResponse {
    user: User
    token: String
  }  
  
type Mutation {
    createUser(username: String!, email: String!, password: String!): AuthResponse
    removeBook(bookId: ID!): Book
    login(username: String!, email: String!, password: String!): AuthResponse
  }
`
module.exports = typeDefs;