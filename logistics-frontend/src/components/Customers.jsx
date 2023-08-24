import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Input,
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

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [editCustomerId, setEditCustomerId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const bgColor = useColorModeValue('gray.100', 'gray.800');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('https://logistic-cyvh.onrender.com/api/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post('https://logistic-cyvh.onrender.com/api/customers', { name, city });
      setName('');
      setCity('');
      fetchCustomers();
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };

  const handleEdit = (customerId) => {
    setEditCustomerId(customerId);
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`https://logistic-cyvh.onrender.com/api/customers/${editCustomerId}`, { name, city });
      setName('');
      setCity('');
      setEditCustomerId(null);
      setIsModalOpen(false);
      fetchCustomers();
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  const confirmDelete = (customerId) => {
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
          await axios.delete(`https://logistic-cyvh.onrender.com/api/customers/${customerId}`);
          Swal.fire(
            'Deleted!',
            'The customer has been deleted.',
            'success'
          );
          fetchCustomers();
        } catch (error) {
          console.error('Error deleting customer:', error);
        }
      }
    });
  };

  return (
    <Box bg={bgColor} p={8} align="center">
      <Heading as="h1" mb={4}>
        Customers
      </Heading>
      <Flex direction="column" mb={4} width={{ base: '90%', lg: '50%' }}>
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          mb={2}
        />
        <Input
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          mb={2}
        />
        <Button colorScheme="blue" onClick={handleCreate}>
          Add Customer
        </Button>
      </Flex>
      {customers.map((customer) => (
        <Flex
          key={customer._id}
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
              {customer.name}
            </Text>
            <Text mt={2}>City: {customer.city}</Text>
          </Box>
          <Flex>
            <IconButton
              aria-label="Edit"
              icon={<EditIcon />}
              colorScheme="blue"
              size="sm"
              mr={2}
              onClick={() => handleEdit(customer._id)}
            />
            <IconButton
              aria-label="Delete"
              icon={<DeleteIcon />}
              colorScheme="red"
              size="sm"
              onClick={() => confirmDelete(customer._id)}
            />
          </Flex>
        </Flex>
      ))}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Customer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              mb={2}
            />
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
            <Button colorScheme="gray" ml={2} onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Customers;
