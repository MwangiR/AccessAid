const { Schema, model } = require('mongoose');

const eventSchema = new Schema(
  {
    clientId: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
    dueDate: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

const TimelineEvent = model('TimelineEvent', eventSchema);
module.exports = TimelineEvent;
