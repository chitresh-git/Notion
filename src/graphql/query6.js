import { gql } from 'graphql-request';

// Define your GraphQL mutations
export const CREATE_AUTHOR_MUTATION = gql`
  mutation CreateAuthor($name: String!, $email: String!, $bio: String!, $insta: String!, $linkedin: String!, $city: String! , $avatarId: ID!) {
    createAuthor(data: {name: $name, email: $email, bio: $bio, insta: $insta, linkedin: $linkedin, city: $city, avatar: {connect: {id: $avatarId}}}) {
      id
    }
  }
`;

export const PUBLISH_AUTHOR_MUTATION = gql`
  mutation PublishAuthor($id: ID!) {
    publishAuthor(where: { id: $id }) {
      id
      name
      email
      bio
      insta
      linkedin
      city
    }
  }
`;
