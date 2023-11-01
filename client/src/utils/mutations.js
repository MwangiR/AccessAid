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
      status
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation updateEvent($updateEventInput: UpdateEvent) {
    updateEvent(updateEventInput: $updateEventInput) {
      _id
      dueDate
      eventCategory
      notes
      status
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

export const DELETE_MEDICATION = gql`
  mutation deleteMedication($medicationId: ID!) {
    deleteMedication(medicationId: $medicationId) {
      _id
    }
  }
`;

export const CREATE_MEDICATION = gql`
  mutation createMedication($medicationInput: CreateMedication) {
    createMedication(medicationInput: $medicationInput) {
      clientId
      timeOfDay
      medicationName
      notes
      description
      quantity
      frequency
      dosage
      status
    }
  }
`;

export const UPDATE_MEDCHART = gql`
  mutation updateMedchart($updateMedchart: [updateMedchart!]!) {
    updateMedchart(updateMedchart: $updateMedchart) {
      _id
      status
      quantity
    }
  }
`;
