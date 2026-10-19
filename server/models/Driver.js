const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    vehicleType: { type: String, required: true },
    vehicleNumber: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    area: { type: String, required: true },
    status: {
      type: String,
      enum: ['available', 'busy', 'offline'],
      default: 'available',
    },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Driver', driverSchema);
