const express = require('express');
const { getDrivers, getDriverById } = require('../controllers/driverController');

const router = express.Router();

router.get('/', getDrivers);
router.get('/:id', getDriverById);

module.exports = router;
