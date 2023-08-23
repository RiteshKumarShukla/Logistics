const express = require('express');
const router = express.Router();
const deliveryVehiclesController = require('../controllers/deliveryVehiclesController');

// Define routes
router.get('/', deliveryVehiclesController.getDeliveryVehicles);
router.post('/', deliveryVehiclesController.createDeliveryVehicle);
router.put('/:id', deliveryVehiclesController.updateDeliveryVehicle);
router.delete('/:id', deliveryVehiclesController.deleteDeliveryVehicle);

module.exports = router;
