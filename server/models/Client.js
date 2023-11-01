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
      match: [
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
        'Please enter a valid email',
      ],
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
    Medications: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Medication',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);
//lowercase email before save
clientSchema.pre('save', async function (next) {
  if (this.isModified('email') || this.isNew) {
    this.email = this.email.toLowerCase();
  }
  next();
});

const Client = model('Client', clientSchema);
module.exports = Client;
