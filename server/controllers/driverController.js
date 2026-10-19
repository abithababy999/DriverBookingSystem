const { drivers } = require('../data/seedData');

exports.getDrivers = (req, res) => {
  res.json(drivers);
};

exports.getDriverById = (req, res) => {
  const driver = drivers.find((item) => item.id === Number(req.params.id));

  if (!driver) {
    return res.status(404).json({ message: 'Driver not found' });
  }

  res.json(driver);
};
