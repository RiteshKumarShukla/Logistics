import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Image,
  Stack,
  Input,
  Select,
  useColorModeValue,
  Button,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const dummyImages = [
  "https://images.unsplash.com/photo-1426024084828-5da21e13f5dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9iaWxlJTIwYW5kJTIwbGFwdG9wfGVufDB8fDB8fHww&w=1000&q=80",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZlu99v76I5u1Weu6iL6sAljm55brvyHfRsQ&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlq7_aHPW6wEcve0KkO829s7zu08b8KH0gZw&usqp=CAU",
  "https://qph.cf2.quoracdn.net/main-qimg-cb9c5ea6829780dac00ee813f4cb2d5d-lq",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrkkcfu80ri3-Spc8oWX4CROYnvO1H_vlPBA&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4395X4DyjclIV3q6g1wvOjkRFiuDZtFELytR-Pa0GajC9aaiL_y_SjgOzFg2ybxCeN14&usqp=CAU",
  "https://previews.123rf.com/images/fkdkondmi/fkdkondmi1303/fkdkondmi130300019/18690691-laptop-tablet-pc-mobile-phone-tv-and-navigator-with-nature-wallpaper-are-shown-in-the-image.jpg",
];

function getRandomImage() {
  return dummyImages[Math.floor(Math.random() * dummyImages.length)];
}

function Items() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("name");
  const bgColor = useColorModeValue("gray.100", "gray.800");

  useEffect(() => {
    axios
      .get("https://logistic-cyvh.onrender.com/api/items/")
      .then((response) => {
        setItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  let sortedItems;
  if (sortBy === "") {
    sortedItems = filteredItems;
  } else {
    sortedItems = filteredItems
      .slice()
      .sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleViewItem = (itemName) => {
    Swal.fire({
      icon: "info",
      title: "Item View",
      text: `You are viewing ${itemName}`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <Box bg={bgColor} p={8}>
      <Heading as="h1" mb={4}>
        Items
      </Heading>
      <Flex justify="space-between" align="center" mb={4} m={4}>
        <Input
          placeholder="Search items"
          value={searchTerm}
          onChange={handleSearchChange}
          mr={2}
        />
        <Select
          value={sortBy}
          onChange={handleSortChange}
          colorScheme="blue"
          ml={2}
        >
          <option value="">Select A Category</option>
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
        </Select>
      </Flex>
      <Stack spacing={8}>
        {loading ? (
          <Flex justify="center" align="center" h="200px">
            <Spinner size="xl" />
          </Flex>
        ) : (
          currentItems.map((item) => (
            <Flex key={item._id} rounded="lg" shadow="md" p={4}>
              <Image
                src={getRandomImage()}
                alt={item.name}
                width={"25%"}
                height={"25%"}
                borderRadius={"5%"}
                objectFit="cover"
              />
              <Box ml={4}>
                <Text fontWeight="bold" fontSize="lg">
                  {item.name}
                </Text>
                <Text mt={2}>Price: ${item.price}</Text>
                <Link to={`/view/${item._id}`}>
                  <Button
                    colorScheme="blue"
                    mt={5}
                    onClick={() => handleViewItem(item.name)}
                  >
                    View Item
                  </Button>
                </Link>
              </Box>
            </Flex>
          ))
        )}
      </Stack>

      <Flex mt={8} justify="center">
        {Array.from({
          length: Math.ceil(sortedItems.length / itemsPerPage),
        }).map((_, index) => (
          <Button
            key={index}
            mx={1}
            colorScheme={currentPage === index + 1 ? "blue" : "gray"}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
      </Flex>
    </Box>
  );
}

export default Items;
