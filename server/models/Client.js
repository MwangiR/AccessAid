const { Schema, model } = require('mongoose');

const clientSchema = new Schema(
  {
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
      required: false,
    },
    guardianName: {
      type: String,
      required: false,
    },
    guardianContact: {
      type: Number,
      required: false,
    },
    created_At: {
      type: String,
      required: false,
    },
    timelineEvents: [
      {
        type: Schema.Types.ObjectId,
        ref: 'TimelineEvent',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

const Client = model('Client', clientSchema);
module.exports = Client;
