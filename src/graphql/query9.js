import { gql } from '@apollo/client';

export const GET_AUTHOR_BY_ID = gql`
  query GetAuthorById($authorId: ID!) {
    author(where: { id: $authorId }) {
      id
      name
      email
      bio
      city
      insta
      linkedin
      avatar {
        url
      }
    }
  }
`;
