const express = require('express');
const { authenticate } = require('./middleware');

const router = express.Router();


const itemsRoutes = require('../routes/itemsRoutes');
const customersRoutes = require('../routes/customersRoutes');
const deliveryVehiclesRoutes = require('../routes/deliveryVehiclesRoutes');
const ordersRoutes = require('../routes/ordersRoutes');

router.use('/items', itemsRoutes);
router.use('/customers', customersRoutes);
router.use('/delivery-vehicles', deliveryVehiclesRoutes);
router.use('/orders', ordersRoutes);

module.exports = router;
