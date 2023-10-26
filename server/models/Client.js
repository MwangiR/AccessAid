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
  timelineEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: 'TimelineEvent',
    },
  ],
});

const Client = model('Client', clientSchema);
module.exports = Client;
