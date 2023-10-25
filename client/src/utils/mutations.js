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