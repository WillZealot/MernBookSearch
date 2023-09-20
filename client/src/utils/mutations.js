import { gql } from '@apollo/client';
// put the queries that apollo is giving you here to create the user and what info you want returned
// we are creating these to replace essentially the whole api hit system
export const CREATE_USER = gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      user {
        username
        email
        id
      }
      token
    }
  }
`;

export const LOGIN = gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
    login(username: $username, email: $email, password: $password) {
      user {
        username
        email
        savedBooks {
          title
          authors
          bookId
          description
          image
          link
        }
      }
    }
  }
`;

//export const DELETE_BOOK = gql`
//`;

//export const ADD_BOOK = gql`
//`;