const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    const { customer, pickupLocation, destination, serviceType, bookingDate, estimatedFare } = req.body;

    const booking = await Booking.create({
      customer,
      pickupLocation,
      destination,
      serviceType,
      bookingDate,
      estimatedFare,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('customer').populate('driver');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
