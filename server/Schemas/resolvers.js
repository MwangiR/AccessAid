const { User, Client } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
        return userData;
      }
      throw new Error('Not logged in');
    },
    clients: async (parent, args) => {
      const clientData = await Client.find({});
      return clientData;
    },
  },
  Mutation: {
    registerUser: async (parent, args) => {
      const { username, email, password } = args.registerInput;
      // see if an old user exists with email attempting to register
      const oldUser = await User.findOne({ email: args.email });

      // Throw error if that user exists
      if (oldUser) {
        throw new Error('User already exists');
      }
      // Create new user
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    loginUser: async (parent, args) => {
      const { email, password } = args.loginInput;
      const user = await User.findOne({ email: email });

      console.log('User', user);
      if (!user) {
        throw new Error('User not found');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new Error('Incorrect password');
      }

      const token = signToken(user);
      return { token, user };
    },
    registerClient: async (_, { registerClient }) => {
      const { name, email, description, guardianName, guardianContact } = registerClient;

      // Get the current date and time in a suitable format (e.g., ISO 8601) as a string
      const currentDateTime = new Date().toISOString();
      // Check if a client with the same email already exists
      const existingClient = await Client.findOne({ email });

      if (existingClient) {
        throw new Error('Client already exists');
      }
      // Create a new client with the 'created_At' field set to the current date and time
      const newClient = await Client.create({
        name,
        email,
        description,
        guardianName,
        guardianContact,
        created_At: currentDateTime, // Make sure to use 'created_At' if that's what your type definition specifies.
      });

      return newClient;
    },
  },
};

module.exports = resolvers;
