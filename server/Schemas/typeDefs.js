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
    Medications: [Medication]
  }

  type Medication {
    _id: ID!
    clientId: ID!
    clientName: String!
    timeOfDay: String!
    medicationName: String!
    description: String!
    quantity: Int!
    frequency: String!
    duration: Int!
    notes: String
    status: String!
  }

  type Event {
    _id: ID!
    clientId: ID!
    clientName: String!
    createdAt: String
    eventCategory:String
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

  input CreateMedication {
    clientId: ID!
    timeOfDay: String!
    medicationName: String!
    description: String!
    quantity: Int!
    frequency: String!
    duration: Int!
    notes: String
    status: String!
  }
  
  input CreateEvent {
    clientId: ID!
    eventCategory:String
    notes: String!
    dueDate: String
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
    deleteClient(clientId: ID!): Client
    createEvent(eventInput: CreateEvent): Event
    deleteEvent(eventId: ID!):Event
    createMedication(medicationInput: CreateMedication): Medication
  }

  type Query {
    users: [User]
    clients: [Client]
    client(_id: ID!): Client
    events: [Event]
    medications: [Medication]
  }
`;
module.exports = typeDefs;
