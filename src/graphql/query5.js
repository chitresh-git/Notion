// this all the post except the mentioned one 
import { gql } from '@apollo/client';

export const GET_POSTS_BY_AUTHOR = gql`
  query GetPostsByAuthor($authorId: ID!, $postIdToExclude: ID!) {
    posts(where: { author: { id: $authorId }, NOT: { id: $postIdToExclude } }) {
        id,
    title,
    date,
    text,
    content{
      html
    },

    
    author{
      name,
      id,
     name,
     bio,
     email,
     city,
     insta,
     linkedin,
      avatar{
        url
      }
    }

    pic{
      url
    }

    }
  }
`;
