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

export const GET_CLIENTS = gql`
  query CLIENTS {
    clients {
      _id
      name
      email
      description
      guardianName
      guardianContact
      createdAt: created_At
    }
  }
`;
