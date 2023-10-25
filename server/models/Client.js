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
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

const Client = model('Client', clientSchema);
module.exports = Client;
