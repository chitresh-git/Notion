import { gql } from '@apollo/client';

export const GET_AUTHORS = gql`
 {
    authors {
    id
    name
    email
    bio
    city
    insta
    linkedin
    avatar{
      url
    }
  }
}
`;