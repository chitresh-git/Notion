import { GraphQLClient, gql } from 'graphql-request';

const client = new GraphQLClient(process.env.REACT_APP_GRAPHQL_ENDPOINT, {
  headers: {
    authorization: process.env.REACT_APP_GRAPHQL_TOKEN,
  },
});

export default client;