import React, { useEffect, useState } from 'react';
import {
  Container,
  Heading,
  Flex,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Select,
  TableContainer,
} from '@chakra-ui/react';
import axios from 'axios';
function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [displayedOrders, setDisplayedOrders] = useState([]);
  const bgColor = useColorModeValue('gray.100', 'gray.800');
  const statusColor = {
    true: 'green.500', // Delivered
    false: 'red.500', // Not Delivered
  };

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/orders')
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  useEffect(() => {
    // Apply filters and search
    let filteredOrders = orders;

    if (statusFilter !== 'all') {
      const isDelivered = statusFilter === 'delivered';
      filteredOrders = filteredOrders.filter((order) => order.isDelivered === isDelivered);
    }

    if (searchTerm) {
      filteredOrders = filteredOrders.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.itemId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.deliveryVehicleId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setDisplayedOrders(filteredOrders);
  }, [orders, statusFilter, searchTerm]);

  return (
    <Container maxW="container.lg" py={8}>
      <Heading as="h1" size="xl" mb={4}>
        Orders List
      </Heading>

      <Flex justify="space-between" align="center" mb={4}>
        <Input
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          w="40%"
        />
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          w="20%"
        >
          <option value="all">All</option>
          <option value="delivered">Delivered</option>
          <option value="notDelivered">Not Delivered</option>
        </Select>
      </Flex>

      <TableContainer>
        <Table variant="striped" colorScheme="blue">
          <Thead>
            <Tr>
              <Th>Order Number</Th>
              <Th>Price</Th>
              <Th>Item Id</Th>
              <Th>Customer Id</Th>
              <Th>Delivery Vehicle Id</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {displayedOrders.map((order) => (
              <Tr key={order._id}>
                <Td>{order.orderNumber}</Td>
                <Td>${order.price}</Td>
                <Td>{order.itemId}</Td>
                <Td>{order.customerId}</Td>
                <Td>{order.deliveryVehicleId}</Td>
                <Td color={statusColor[order.isDelivered.toString()]}>
                  {order.isDelivered ? 'Delivered' : 'Not Delivered'}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default OrdersList;
