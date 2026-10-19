const { dashboardStats, staff, bookings } = require('../data/seedData');

exports.getDashboardStats = (req, res) => {
  res.json({
    ...dashboardStats,
    recentBookings: bookings.slice(0, 3),
    staff,
  });
};
