const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    date: {
      type: Date,
      required: true,
      validate: {
        validator: (v) => !isNaN(Date.parse(v)),
        message: props => `${props.value} is not a valid date!`
      }
    },
    location: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    ticketsAvailable: { type: Number, required: true },
  },
  { timestamps: true } // Optional: Add timestamps for createdAt and updatedAt fields
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
