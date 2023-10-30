const { User, Client, Event, Medication } = require('../models');
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
    clients: async () => {
      try {
        const clientData = await Client.find({}).populate('Events').populate('Medications');
        return clientData;
      } catch (err) {
        console.error('Error fetching clients', err);
        throw new Error(err);
      }
    },
    events: async (parent) => {
      try {
        const eventData = await Event.find();
        return eventData;
      } catch (err) {
        console.error('Error fetching events', err);
        throw new Error(err);
      }
    },

    client: async (parent, args) => {
      try {
        const clientData = await Client.findOne({ _id: args._id })
          .populate('Events')
          .populate('Medications');
        return clientData;
      } catch (err) {
        console.error('Error fetching client', err);
        throw new Error(err);
      }
    },

    medications: async () => {
      try {
        const medicationData = await Medication.find();
        return medicationData;
      } catch (err) {
        console.error('Error fetching medications', err);
        throw new Error(err);
      }
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
    registerClient: async (_, { clientInput }) => {
      // const { name, email, description, guardianName, guardianContact } = registerClient;
      // Check if a client with the same email already exists
      const existingClient = await Client.findOne({ ...clientInput });

      if (existingClient) {
        throw new Error('Client already exists');
      }
      const newClient = new Client(clientInput);

      return await newClient.save();
    },
    createEvent: async (_, { eventInput }) => {
      const { clientId, eventCategory, notes, dueDate } = eventInput;

      if (!clientId) {
        throw new Error('clientId is required'); // Ensure that clientId is provided
      }
      // find the client document using the client ID
      const clientDoc = await Client.findById(clientId).lean();

      if (!clientDoc) {
        throw new Error('Client not found');
      }
      //extract the clientName
      const clientName = clientDoc.name;

      // Validate other input fields and perform the creation of the TimelineEvent
      const newEvent = await Event.create({
        clientId,
        clientName,
        eventCategory,
        notes,
        dueDate,
      });

      const updateClientDoc = await Client.findOneAndUpdate(
        { _id: clientId },
        { $push: { Events: newEvent._id } },
        { new: true },
      ).lean();

      return newEvent;
    },

    deleteClient: async (_, { clientId }) => {
      //find client by id
      if (!clientId) {
        throw new Error('clientId is required');
      }
      try {
        const deletedClient = await Client.findByIdAndDelete(clientId);
        return deletedClient;
      } catch (error) {
        throw new Error('Failed to delete client: ' + error.message);
      }
    },

    deleteEvent: async (_, { eventId }) => {
      //find event by id
      if (!eventId) {
        throw new Error('eventId is required');
      }
      try {
        const deletedEvent = await Event.findByIdAndDelete(eventId);

        await Client.updateMany(
          {
            Events: eventId,
          },
          {
            $pull: {
              Events: eventId,
            },
          },
        );

        return deletedEvent;
      } catch (error) {
        throw new Error('Failed to delete event: ' + error.message);
      }
    },

    createMedication: async (_, { medicationInput }) => {
      try {
        const {
          clientId,
          timeOfDay,
          medicationName,
          description,
          quantity,
          frequency,
          duration,
          notes,
          status,
        } = medicationInput;

        // Ensure that clientId is provided
        if (!clientId) {
          throw new Error('clientId is required');
        }

        // find the client document using the client ID
        const clientDoc = await Client.findById(clientId).lean();

        if (!clientDoc) {
          throw new Error('Client not found');
        }
        //extract the clientName
        const clientName = clientDoc.name;

        const newMedication = await Medication.create({
          clientId,
          clientName,
          timeOfDay,
          medicationName,
          description,
          quantity,
          frequency,
          duration,
          notes,
          status,
        });

        await Client.findByIdAndUpdate(
          { _id: clientId },
          {
            $push: {
              Medications: newMedication._id,
            },
          },
          { new: true },
        );

        return newMedication;
      } catch (error) {
        throw new Error('Failed to create medication: ' + error.message);
      }
    },
  },
};

module.exports = resolvers;
