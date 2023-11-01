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
    event: async (_, args) => {
      try {
        const eventData = await Event.findOne({ _id: args._id });
        return eventData;
      } catch (err) {
        console.error('Error fetching event', err);
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
    medication: async (_, args) => {
      try {
        const medicationData = await Medication.findOne({ _id: args._id });
        return medicationData;
      } catch (err) {
        console.error('Error fetching medication', err);
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
      const { clientId, eventCategory, notes, dueDate, status } = eventInput;

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
        status,
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

      try {
        if (!clientId) {
          throw new Error('clientId is required');
        }

        // find the client document using the client ID
        const client = await Client.findById(clientId);

        if (!client) {
          throw new Error('Client Not found');
        }

        //delete associated Events and Medications
        for (const eventId of client.Events) {
          await Event.findByIdAndDelete(eventId);
        }

        for (const medicationId of client.Medications) {
          await Medication.findByIdAndDelete(medicationId);
        }

        const deletedClient = await Client.findByIdAndDelete(clientId);

        if (!deletedClient) {
          throw new Error('Failed to delete client');
        }

        return deletedClient;
      } catch (error) {
        throw new Error('Failed to delete client: ' + error.message);
      }
    },

    updateEvent: async (_, { updateEventInput }) => {
      if (!updateEventInput) {
        throw new Error('updateEventInput is required');
      }
      const { _id, eventCategory, notes, dueDate, status } = updateEventInput;
      try {
        if (!_id) {
          throw new Error('eventId is required');
        }
        const updatedEvent = await Event.findByIdAndUpdate(
          { _id },
          { eventCategory, notes, dueDate, status },
          { new: true },
        );
        if (!updatedEvent) {
          throw new Error('Failed to update event');
        }
        return updatedEvent;
      } catch (error) {
        throw new Error('Failed to update event: ' + error.message);
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
          dosage,
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

        //convert to integers
        const quantityInt = parseInt(quantity);
        const dosageInt = parseInt(dosage);

        const newMedication = await Medication.create({
          clientId,
          clientName,
          timeOfDay,
          medicationName,
          description,
          frequency,
          quantity: quantityInt,
          dosage: dosageInt,
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

    updateMedication: async (_, { updateMedicationInput }) => {
      if (!updateMedicationInput) {
        throw new Error('updateMedicationInput is required');
      }
      const {
        _id,
        timeOfDay,
        medicationName,
        description,
        quantity,
        frequency,
        dosage,
        notes,
        status,
      } = updateMedicationInput;
      try {
        if (!_id) {
          throw new Error('medicationId is required');
        }
        const updatedMedication = await Medication.findByIdAndUpdate(
          { _id },
          { timeOfDay, medicationName, description, quantity, frequency, dosage, notes, status },
          { new: true },
        );
        if (!updatedMedication) {
          throw new Error('Failed to update medication');
        }
        return updatedMedication;
      } catch (error) {
        throw new Error('Failed to update medication: ' + error.message);
      }
    },

    updateMedchart: async (_, { updateMedchart }) => {
      if (!updateMedchart || updateMedchart.length === 0) {
        throw new Error('updateMedchart is required');
      }
      try {
        const updatedMedications = await Promise.all(
          updateMedchart.map(async (med) => {
            const { _id, status, quantity } = med;
            if (!_id) {
              throw new Error('medicationId is required');
            }

            //consvert quantity to an integer
            // const quantityInt = parseInt(quantity);
            const updatedMedchart = await Medication.findByIdAndUpdate(
              { _id },
              { status, quantity },
              { new: true },
            );
            if (!updatedMedchart) {
              throw new Error('Failed to update medication');
            }
            return updatedMedchart;
          }),
        );

        return updatedMedications;
      } catch (error) {
        throw new Error('Failed to update medication: ' + error.message);
      }
    },
    deleteMedication: async (_, { medicationId }) => {
      //find medication by id
      if (!medicationId) {
        throw new Error('eventId is required');
      }
      try {
        const deletedMedication = await Medication.findByIdAndDelete(medicationId);

        await Client.updateMany(
          {
            Medications: medicationId,
          },
          {
            $pull: {
              Medications: medicationId,
            },
          },
        );

        return deletedMedication;
      } catch (error) {
        throw new Error('Failed to delete medication: ' + error.message);
      }
    },
  },
};

module.exports = resolvers;
