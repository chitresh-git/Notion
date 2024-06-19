// this query will fetch data of all authors
import { gql } from '@apollo/client';

export const GET_AUTHORS = gql`
 {
    authors (first: 5000){
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