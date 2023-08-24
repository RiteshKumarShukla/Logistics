import React from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleColorModeToggle = () => {
    toggleColorMode();
    Swal.fire({
      icon: "success",
      title: "Color Mode Changed",
      text: `Switched to ${colorMode === "light" ? "Dark" : "Light"} mode!`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleMenuToggle = () => {
    isOpen ? onClose() : onOpen();
    Swal.fire({
      icon: "info",
      title: "Menu Toggled",
      text: "Mobile menu has been toggled!",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <Box bg="blue.500" py={3} px={4} position="sticky" top={0} zIndex={100}>
      <Flex
        justify="space-between"
        align="center"
        direction={{ base: "row", md: "row" }}
      >
        <Flex align="center">
          <Link to="/">
            <Text fontWeight="bold" fontSize="xl" color="white">
              Logistics
            </Text>
          </Link>
        </Flex>
        <Flex align="center" display={{ base: "none", md: "flex" }}>
          <Link to="/">
            <Button
              variant="ghost"
              color="white"
              mr={4}
              _hover={{ textDecoration: "none" }}
            >
              Home
            </Button>
          </Link>
          <Link to="/items">
            <Button
              variant="ghost"
              color="white"
              mr={4}
              _hover={{ textDecoration: "none" }}
            >
              Items
            </Button>
          </Link>
          <Link to="/customers">
            <Button
              variant="ghost"
              color="white"
              mr={4}
              _hover={{ textDecoration: "none" }}
            >
              Customers
            </Button>
          </Link>
          <Link to="/delivery-vehicles">
            <Button
              variant="ghost"
              color="white"
              mr={4}
              _hover={{ textDecoration: "none" }}
            >
              Vehicles
            </Button>
          </Link>
          <Link to="/orders">
            <Button
              variant="ghost"
              color="white"
              _hover={{ textDecoration: "none" }}
            >
              Orders
            </Button>
          </Link>
          <Link to="/login">
            <Button
              variant="ghost"
              color="white"
              _hover={{ textDecoration: "none" }}
            >
              Login
            </Button>
          </Link>
          <IconButton
            ml={4}
            aria-label="Toggle Color Mode"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={handleColorModeToggle}
          />
        </Flex>
        <IconButton
          aria-label="Toggle Menu"
          icon={<HamburgerIcon />}
          onClick={handleMenuToggle}
          display={{ base: "block", md: "none" }}
        />
      </Flex>
      {isOpen && (
        <Box mt={2}>
          <IconButton
            ml={280}
            mt={-79}
            aria-label="Toggle Color Mode"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={handleColorModeToggle}
          />
          <Link to="/">
            <Button
              variant="ghost"
              color="white"
              w="full"
              mb={2}
              _hover={{ textDecoration: "none" }}
            >
              Home
            </Button>
          </Link>
          <Link to="/items">
            <Button
              variant="ghost"
              color="white"
              w="full"
              mb={2}
              _hover={{ textDecoration: "none" }}
            >
              Items
            </Button>
          </Link>
          <Link to="/customers">
            <Button
              variant="ghost"
              color="white"
              w="full"
              mb={2}
              _hover={{ textDecoration: "none" }}
            >
              Customers
            </Button>
          </Link>
          <Link to="/delivery-vehicles">
            <Button
              variant="ghost"
              color="white"
              w="full"
              mb={2}
              _hover={{ textDecoration: "none" }}
            >
              Vehicles
            </Button>
          </Link>
          <Link to="/orders">
            <Button
              variant="ghost"
              color="white"
              w="full"
              _hover={{ textDecoration: "none" }}
            >
              Orders
            </Button>
          </Link>
          <Link to="/login">
            <Button
              variant="ghost"
              color="white"
              w="full"
              _hover={{ textDecoration: "none" }}
            >
              Login
            </Button>
          </Link>
        </Box>
      )}
    </Box>
  );
}

export default Navbar;

