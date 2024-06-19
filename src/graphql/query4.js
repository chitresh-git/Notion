// src/graphql/queries.js
// this will fetch specific post and its author 

import { gql } from '@apollo/client';

export const GET_POST_BY_ID  = gql`
query GetPostById($postId: ID!) {
  post(where: { id: $postId }) {
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
