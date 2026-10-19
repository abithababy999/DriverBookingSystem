const drivers = [
  {
    id: 1,
    name: 'Anoop',
    phone: '+91 98765 12345',
    location: 'Mukkom',
    vehicle: 'Car',
    status: 'available',
    rating: 4.8,
    baseFare: 180,
    perKm: 18,
  },
  {
    id: 2,
    name: 'Babu',
    phone: '+91 98956 23456',
    location: 'Kozhikode',
    vehicle: 'Car',
    status: 'busy',
    rating: 4.6,
    baseFare: 200,
    perKm: 20,
  },
  {
    id: 3,
    name: 'Shaji',
    phone: '+91 99456 34567',
    location: 'Perambra',
    vehicle: 'Auto',
    status: 'available',
    rating: 4.9,
    baseFare: 150,
    perKm: 16,
  },
  {
    id: 4,
    name: 'Ravi',
    phone: '+91 99654 45678',
    location: 'Kallayi',
    vehicle: 'Car',
    status: 'available',
    rating: 4.7,
    baseFare: 220,
    perKm: 19,
  },
];

const customers = [
  {
    id: 1,
    name: 'Rahul',
    phone: '+91 97654 11223',
    location: 'Mukkom',
  },
  {
    id: 2,
    name: 'Anu',
    phone: '+91 96543 22334',
    location: 'Kozhikode',
  },
  {
    id: 3,
    name: 'Nikhil',
    phone: '+91 95432 33445',
    location: 'Perambra',
  },
];

const bookings = [
  {
    id: 1,
    customerName: 'Rahul',
    pickupLocation: 'Mukkom',
    destination: 'Kozhikode',
    serviceType: 'driver',
    bookingDate: '2026-10-19',
    status: 'assigned',
    estimatedFare: 450,
    driverName: 'Anoop',
  },
  {
    id: 2,
    customerName: 'Anu',
    pickupLocation: 'Kozhikode',
    destination: 'Mukkom',
    serviceType: 'driver',
    bookingDate: '2026-10-20',
    status: 'completed',
    estimatedFare: 390,
    driverName: 'Shaji',
  },
  {
    id: 3,
    customerName: 'Nikhil',
    pickupLocation: 'Perambra',
    destination: 'Calicut',
    serviceType: 'driver',
    bookingDate: '2026-10-21',
    status: 'pending',
    estimatedFare: 500,
    driverName: 'Ravi',
  },
];

const staff = [
  { id: 1, name: 'Reshma', role: 'Dispatcher', phone: '+91 99887 76543' },
  { id: 2, name: 'Jithin', role: 'Support', phone: '+91 99666 55443' },
  { id: 3, name: 'Akhil', role: 'Admin', phone: '+91 98555 66554' },
];

const dashboardStats = {
  totalBookings: 128,
  activeDrivers: 12,
  revenue: 84500,
  pendingJobs: 7,
  serviceTypes: ['Driver', 'Plumber', 'Electrician', 'Cleaner'],
};

module.exports = { drivers, customers, bookings, staff, dashboardStats };
