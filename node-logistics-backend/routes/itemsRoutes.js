const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');

// Define routes
router.get('/', itemsController.getItems);
router.get('/:id', itemsController.getItemById); 
router.post('/', itemsController.createItem);
router.put('/:id', itemsController.updateItem);
router.delete('/:id', itemsController.deleteItem);

module.exports = router;
