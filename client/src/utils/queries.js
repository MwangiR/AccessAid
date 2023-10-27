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

export const GET_EVENTS = gql`
  query EVENT {
    events {
      _id
      clientId
      clientName
      createdAt
      notes
      dueDate
      status
    }
  }
`;

export const GET_SINGLE_CLIENT = gql`
  query CLIENT($id: ID!) {
    client(_id: $id) {
      _id
      name
      email
      description
      guardianName
      guardianContact
      createdAt: created_At
      Events {
        _id
        clientName
        createdAt
        notes
        dueDate
        status
      }
    }
  }
`;
