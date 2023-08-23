const DeliveryVehicle = require('../models/DeliveryVehicle');

// Controller functions
const getDeliveryVehicles = async (req, res) => {
  try {
    const deliveryVehicles = await DeliveryVehicle.find();
    res.json(deliveryVehicles);
  } catch (error) {
    res.status(500).json({ message: 'Error getting delivery vehicles', error: error.message });
  }
};

const createDeliveryVehicle = async (req, res) => {
  try {
    const newDeliveryVehicle = new DeliveryVehicle(req.body);
    await newDeliveryVehicle.save();
    res.status(201).json(newDeliveryVehicle);
  } catch (error) {
    res.status(400).json({ message: 'Error creating delivery vehicle', error: error.message });
  }
};

const updateDeliveryVehicle = async (req, res) => {
  try {
    const updatedDeliveryVehicle = await DeliveryVehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedDeliveryVehicle);
  } catch (error) {
    res.status(400).json({ message: 'Error updating delivery vehicle', error: error.message });
  }
};

const deleteDeliveryVehicle = async (req, res) => {
  try {
    await DeliveryVehicle.findByIdAndDelete(req.params.id);
    res.json({ message: 'Delivery vehicle deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting delivery vehicle', error: error.message });
  }
};

module.exports = {
  getDeliveryVehicles,
  createDeliveryVehicle,
  updateDeliveryVehicle,
  deleteDeliveryVehicle,
};
