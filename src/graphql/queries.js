import { gql } from '@apollo/client';

export const GET_POSTS = gql`
 {
  posts{
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