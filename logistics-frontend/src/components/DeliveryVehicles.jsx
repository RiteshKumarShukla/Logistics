import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Input,
  Select,
  useColorModeValue,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';
import Swal from 'sweetalert2';

function DeliveryVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [city, setCity] = useState('');
  const [editVehicleId, setEditVehicleId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const bgColor = useColorModeValue('gray.100', 'gray.800');

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get('https://logistic-cyvh.onrender.com/api/delivery-vehicles');
      setVehicles(response.data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post('https://logistic-cyvh.onrender.com/api/delivery-vehicles', {
        registrationNumber,
        vehicleType,
        city,
      });
      setRegistrationNumber('');
      setVehicleType('');
      setCity('');
      fetchVehicles();
    } catch (error) {
      console.error('Error creating vehicle:', error);
    }
  };

  const handleEdit = (vehicleId) => {
    setEditVehicleId(vehicleId);
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`https://logistic-cyvh.onrender.com/api/delivery-vehicles/${editVehicleId}`, {
        registrationNumber,
        vehicleType,
        city,
      });
      setRegistrationNumber('');
      setVehicleType('');
      setCity('');
      setEditVehicleId(null);
      setIsModalOpen(false);
      fetchVehicles();
    } catch (error) {
      console.error('Error updating vehicle:', error);
    }
  };

  const handleDelete = (vehicleId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://logistic-cyvh.onrender.com/api/delivery-vehicles/${vehicleId}`);
          Swal.fire(
            'Deleted!',
            'The vehicle has been deleted.',
            'success'
          );
          fetchVehicles();
        } catch (error) {
          console.error('Error deleting vehicle:', error);
        }
      }
    });
  };

  return (
    <Box bg={bgColor} p={8} align="center">
      <Heading as="h1" mb={4}>
        Delivery Vehicles
      </Heading>
      <Flex direction="column" mb={4} width={{ base: '90%', lg: '50%' }}>
        <Input
          placeholder="Registration Number"
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
          mb={2}
        />
        <Select
          placeholder="Vehicle Type"
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
          mb={2}
        >
          <option value="bike">Bike</option>
          <option value="truck">Truck</option>
        </Select>
        <Input
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          mb={2}
        />
        <Button colorScheme="blue" onClick={handleCreate}>
          Create Vehicle
        </Button>
      </Flex>
      {vehicles.map((vehicle) => (
        <Flex
          key={vehicle._id}
          rounded="lg"
          shadow="md"
          p={4}
          mb={2}
          width={{ base: '90%', lg: '50%' }}
          align="center"
          justify="space-between"
        >
          <Box>
            <Text fontWeight="bold" fontSize="lg">
              {vehicle.registrationNumber}
            </Text>
            <Text mt={2}>Type: {vehicle.vehicleType}</Text>
            <Text>City: {vehicle.city}</Text>
          </Box>
          <Flex>
            <IconButton
              aria-label="Edit"
              icon={<EditIcon />}
              colorScheme="blue"
              size="sm"
              mr={2}
              onClick={() => handleEdit(vehicle._id)}
            />
            <IconButton
              aria-label="Delete"
              icon={<DeleteIcon />}
              colorScheme="red"
              size="sm"
              onClick={() => handleDelete(vehicle._id)}
            />
          </Flex>
        </Flex>
      ))}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Vehicle</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Registration Number"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              mb={2}
            />
            <Select
              placeholder="Vehicle Type"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              mb={2}
            >
              <option value="bike">Bike</option>
              <option value="truck">Truck</option>
            </Select>
            <Input
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              mb={2}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleUpdate}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default DeliveryVehicles;
