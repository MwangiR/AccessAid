const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
    }

    type Auth{
        token: ID
        user: User
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
    }

    type Query {
        users: User
    }

`;
module.exports = typeDefs;
