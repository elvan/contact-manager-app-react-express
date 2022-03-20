const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    type: {
      type: String,
      default: 'personal',
      enum: ['personal', 'professional'],
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;
