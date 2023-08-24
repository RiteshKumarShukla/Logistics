import React, { useEffect, useState } from "react";
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
  Switch,
  Input,
  Select,
  TableContainer,
} from "@chakra-ui/react";
import axios from "axios";
import Swal from "sweetalert2";

function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortStatus, setSortStatus] = useState("all");
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const statusColor = {
    true: "green",
    false: "red",
  };

  useEffect(() => {
    axios
      .get("https://logistic-cyvh.onrender.com/api/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const handleStatusToggle = async (orderId) => {
    try {
      const updatedOrders = orders.map((order) => {
        if (order._id === orderId) {
          return { ...order, isDelivered: !order.isDelivered };
        }
        return order;
      });

      setOrders(updatedOrders);

      await axios.patch(`https://logistic-cyvh.onrender.com/api/orders/${orderId}`, {
        isDelivered: updatedOrders.find((order) => order._id === orderId).isDelivered,
      });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Order status updated successfully!",
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update order status.",
      });
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedOrders = sortStatus === "all"
    ? filteredOrders
    : filteredOrders.filter((order) => order.isDelivered === (sortStatus === "delivered"));

  return (
    <Container maxW="container.xl" py={8}>
      <Heading as="h1" size="xl" mb={4}>
        Orders List
      </Heading>
      <Flex justify="space-between" align="center" mb={4} m={4}>
        <Input
          placeholder="Search by Order No"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          mr={2}
        />
        <Select
          value={sortStatus}
          onChange={(e) => setSortStatus(e.target.value)}
          colorScheme="blue"
          ml={2}
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
          {sortedOrders.map((order) => (
            <Tr key={order._id}>
              <Td>{order.orderNumber}</Td>
              <Td>${order.price}</Td>
              <Td>{order.itemId}</Td>
              <Td>{order.customerId}</Td>
              <Td>{order.deliveryVehicleId}</Td>
              <Td color={statusColor[order.isDelivered.toString()]}>
                <Flex align="center">
                  <Switch
                    colorScheme="green"
                    size="sm"
                    isChecked={order.isDelivered}
                    onChange={() => handleStatusToggle(order._id)}
                  />
                  <span>
                    {order.isDelivered ? "Delivered" : "Not Delivered"}
                  </span>
                </Flex>
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
