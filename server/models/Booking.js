const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Driver',
      default: null,
    },
    pickupLocation: { type: String, required: true },
    destination: { type: String, required: true },
    serviceType: {
      type: String,
      enum: ['driver', 'plumber', 'electrician', 'cleaner'],
      default: 'driver',
    },
    bookingDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ['pending', 'assigned', 'in_progress', 'completed', 'cancelled'],
      default: 'pending',
    },
    estimatedFare: { type: Number, required: true },
    finalFare: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
