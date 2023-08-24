const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

// Define routes
router.get('/', ordersController.getOrders);
router.post('/', ordersController.createOrder);
router.put('/:id', ordersController.updateOrder);
router.patch('/:id', ordersController.patchOrder);
router.delete('/:id', ordersController.deleteOrder);

module.exports = router;
