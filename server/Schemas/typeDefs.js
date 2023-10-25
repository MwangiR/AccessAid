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
    }

    type Auth{
        token: ID
        user: User
    }

    input RegisterClient {
        name: String!
        email: String!
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
        registerClient(registerClient: RegisterClient): Client
    }

    type Query {
        users: [User]
        clients: [Client]
    }

`;
module.exports = typeDefs;
