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
    registerClient: async (parent, args) => {
      const { name, email } = args.registerClient;
      // see if an old user exists with email attempting to register
      const oldClient = await Client.findOne({ email: email });
      // Throw error if that user exists
      if (oldClient) {
        throw new Error('User already exists');
      }
      // Create new user
      const client = await Client.create({ name, email });
      return client;
    },
  },
};

module.exports = resolvers;
