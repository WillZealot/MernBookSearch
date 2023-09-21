const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Book {
  id: ID!
  title: String!
  authors: [String]!
  publishedDate: String
  description: String
  image: String
}

type ImageLinks {
  smallThumbnail: String
  thumbnail: String
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
    searchGoogleBooks(query: String!): [Book]
  } 

  type AuthResponse {
    user: User
    token: String
  }  
  
type Mutation {
    createUser(username: String!, email: String!, password: String!): AuthResponse
    removeBook(bookId: ID!): Book
    login(username: String, email: String!, password: String!): AuthResponse
  }
`
module.exports = typeDefs;