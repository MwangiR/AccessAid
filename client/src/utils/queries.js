import { gql } from '@apollo/client';

export const GET_USER = gql`
  query USER {
    user {
      _id
      username
      email
    }
  }
`;
