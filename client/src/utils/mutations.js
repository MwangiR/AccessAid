import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($loginInput: LoginInput) {
    loginUser(loginInput: $loginInput) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation registerUser($registerInput: RegisiterInput) {
    registerUser(registerInput: $registerInput) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const REGISTER_CLIENT = gql`
  mutation registerClient($clientInput: RegisterClient) {
    registerClient(clientInput: $clientInput) {
      name
      email
      description
      guardianName
      guardianContact
    }
  }
`;

export const DELETE_CLIENT = gql`
  mutation deleteClient($clientId: ID!) {
    deleteClient(clientId: $clientId) {
      _id
    }
  }
`;

export const REGISTER_EVENT = gql`
  mutation createEvent($eventInput: CreateEvent) {
    createEvent(eventInput: $eventInput) {
      clientId
      dueDate
      eventCategory
      notes
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation deleteEvent($eventId: ID!) {
    deleteEvent(eventId: $eventId) {
      _id
    }
  }
`;
