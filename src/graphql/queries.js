// this will fetch all authors and post 

import { gql } from '@apollo/client';

export const GET_POSTS = gql`
 {
  posts (first: 5000){
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