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

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box bg="blue.500" py={3} px={4} position="sticky" top={0} zIndex={100}>
      <Flex
        justify="space-between"
        align="center"
        direction={{ base: "row", md: "row" }}
      >
        <Flex align="center">
          <Text fontWeight="bold" fontSize="lg" color="white">
            Logistics
          </Text>
        </Flex>
        <Flex align="center" display={{ base: "none", md: "flex" }}>
          <Button
            variant="ghost"
            color="white"
            mr={4}
            _hover={{ textDecoration: "none" }}
          >
            Home
          </Button>
          <Button
            variant="ghost"
            color="white"
            mr={4}
            _hover={{ textDecoration: "none" }}
          >
            Items
          </Button>
          <Button
            variant="ghost"
            color="white"
            mr={4}
            _hover={{ textDecoration: "none" }}
          >
            Customers
          </Button>
          <Button
            variant="ghost"
            color="white"
            mr={4}
            _hover={{ textDecoration: "none" }}
          >
            Vehicles
          </Button>
          <Button
            variant="ghost"
            color="white"
            _hover={{ textDecoration: "none" }}
          >
            Orders
          </Button>
          <IconButton
            ml={4}
            aria-label="Toggle Color Mode"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
          />
        </Flex>
        <IconButton
          aria-label="Toggle Menu"
          icon={<HamburgerIcon />}
          onClick={isOpen ? onClose : onOpen}
          display={{ base: "block", md: "none" }}
        />
      </Flex>
      {isOpen && (
        <Box mt={2}>
          <Button
            variant="ghost"
            color="white"
            w="full"
            mb={2}
            _hover={{ textDecoration: "none" }}
          >
            Home
          </Button>
          <Button
            variant="ghost"
            color="white"
            w="full"
            mb={2}
            _hover={{ textDecoration: "none" }}
          >
            Items
          </Button>
          <Button
            variant="ghost"
            color="white"
            w="full"
            mb={2}
            _hover={{ textDecoration: "none" }}
          >
            Customers
          </Button>
          <Button
            variant="ghost"
            color="white"
            w="full"
            mb={2}
            _hover={{ textDecoration: "none" }}
          >
            Vehicles
          </Button>
          <Button
            variant="ghost"
            color="white"
            w="full"
            _hover={{ textDecoration: "none" }}
          >
            Orders
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default Navbar;