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
    dosage: Int!
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
    status: String
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

  input UpdateClient {
    _id: ID!
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
    quantity: String!
    frequency: String!
    dosage: String!
    notes: String
    status: String!
  }

  input UpdateMedication {
    _id: ID!
    timeOfDay: String!
    medicationName: String!
    description: String!
    quantity: String!
    frequency: String!
    dosage: String!
    notes: String
    status: String!
  }
  
  input CreateEvent {
    clientId: ID!
    eventCategory:String
    notes: String!
    dueDate: String
    status:String!
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

  input UpdateEvent {
    _id: ID!
    status: String!
    eventCategory:String
    notes:String
    dueDate:String
  }

  input updateMedchart {
    _id: ID!
    status: String!
    quantity: String!
  }

  type Mutation {
    registerUser(registerInput: RegisiterInput): Auth
    loginUser(loginInput: LoginInput): Auth
    deleteUser(userId: ID!): Auth
    registerClient(clientInput: RegisterClient): Client
    updateClient(updateClientInput: UpdateClient): Client
    deleteClient(clientId: ID!): Client
    createEvent(eventInput: CreateEvent): Event
    updateEvent(updateEventInput: UpdateEvent): Event
    deleteEvent(eventId: ID!):Event
    createMedication(medicationInput: CreateMedication): Medication
    updateMedication(updateMedicationInput: UpdateMedication): Medication
    updateMedchart(updateMedchart: [updateMedchart!]!): [Medication]
    deleteMedication(medicationId: ID!): Medication
  }

  type Query {
    users: [User]
    clients: [Client]
    client(_id: ID!): Client
    events: [Event]
    event(_id: ID!): Event
    medications: [Medication]
    medication(_id: ID!): Medication
  }
`;
module.exports = typeDefs;
