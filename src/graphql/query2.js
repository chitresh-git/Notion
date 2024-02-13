// src/graphql/queries.js

import { gql } from '@apollo/client';

export const GET_POSTS_BY_AUTHOR_ID = gql`
 query GetPostsByAuthorId($id: ID!){
    posts(where: { author: { id: $id} }) {
        id,
    title,
    date,
    slug,
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
