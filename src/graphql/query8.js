// query for login using mail and password combination 

import { gql } from 'graphql-request';

export const GET_AUTHOR_BY_PASSWORD = gql`
  query MyQuery($password: String!) {
    author(where: { password: $password }) {
      id
    }
  }
`;

  