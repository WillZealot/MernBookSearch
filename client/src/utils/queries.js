import { gql } from '@apollo/client';
// put the queries that apollo is giving you here to create the user and what info you want returned
// we are creating these to replace essentially the whole api hit system
export const QUERY_USER = gql`
query Query($getSingleUserId: ID!) {
    getSingleUser(id: $getSingleUserId) {
      username
      email
      savedBooks {
        title
        link
        image
        description
        bookId
        authors
      }
    }
  }
`;

//export const SEARCH_BOOKS = gql`

//`;