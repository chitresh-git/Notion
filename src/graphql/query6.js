// this query is use to create and publish the author 

import { gql } from 'graphql-request';

export const CREATE_AUTHOR_MUTATION = gql`
  mutation CreateAuthor($name: String!, $email: String!, $bio: String!, $insta: String!, $linkedin: String!, $city: String! , $avatarId: ID! , $newPassword : String! ) {
    createAuthor(data: {name: $name, email: $email, bio: $bio, insta: $insta, linkedin: $linkedin, city: $city, avatar: {connect: {id: $avatarId}} , password:$newPassword}) {
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
