const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  clientName: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  eventCategory: {
    type: String,
  },
  notes: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const Event = model('Event', eventSchema);
module.exports = Event;
