const { Schema, model } = require('mongoose');

const clientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  guardianName: {
    type: String,
  },
  guardianContact: {
    type: Number,
  },
  created_At: {
    type: Date,
    default: Date.now,
  },
  Events: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Event',
    },
  ],
});

const Client = model('Client', clientSchema);
module.exports = Client;
