const { Schema, model } = require('mongoose');

const medicationSchema = new Schema({
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  clientName: {
    type: String,
  },
  timeOfDay: {
    type: String,
    required: true,
  },
  medicationName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  dosage: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  created_At: {
    type: Date,
    default: Date.now,
  },
});

const Medication = model('Medication', medicationSchema);
module.exports = Medication;
