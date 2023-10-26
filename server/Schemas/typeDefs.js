const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Client {
    _id: ID!
    name: String!
    email: String!
    description: String
    guardianName: String
    guardianContact: Int
    created_At: String
    Events: [Event]
  }

  type Event {
    _id: ID!
    clientId: ID!
    clientName: String!
    createdAt: String
    notes: String
    dueDate: String
    status: Boolean
  }

  type Auth {
    token: ID
    user: User
  }

  input RegisterClient {
    name: String!
    email: String!
    description: String
    guardianName: String
    guardianContact: Int
  }

  input CreateEvent {
    clientId: ID!
    notes: String!
    dueDate: String
    status: Boolean
  }

  input RegisiterInput {
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Mutation {
    registerUser(registerInput: RegisiterInput): Auth
    loginUser(loginInput: LoginInput): Auth
    registerClient(clientInput: RegisterClient): Client
    createEvent(eventInput: CreateEvent): Event
  }

  type Query {
    users: [User]
    clients: [Client]
    events: [Event]
  }
`;
module.exports = typeDefs;
