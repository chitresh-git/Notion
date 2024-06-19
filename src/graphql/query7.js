import { gql } from 'graphql-request';

export const CREATE_POST_MUTATION = gql`
  mutation CreatePost($title: String!, $authorId: ID!, $date: Date!, $picId: ID!, $text: String!) {
    createPost(data: { title: $title, date: $date, author: { connect: { id: $authorId } }, pic: { connect: { id: $picId } }, text: $text }) {
      id
    }
  }
`;

export const PUBLISH_POST_MUTATION = gql`
  mutation PublishPost($id: ID!) {
    publishPost(where: { id: $id }) {
      id
    }
  }
`;
