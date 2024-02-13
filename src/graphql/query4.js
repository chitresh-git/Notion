// src/graphql/queries.js

import { gql } from '@apollo/client';

export const GET_POST_BY_ID  = gql`
query GetPostById($postId: ID!) {
  post(where: { id: $postId }) {
    id,
    title,
    date,
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
