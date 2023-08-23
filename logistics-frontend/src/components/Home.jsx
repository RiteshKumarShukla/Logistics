import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function HomePage() {
  const bgColor = useColorModeValue("gray.100", "gray.800");

  const gradientBg = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.pexels.com/photos/6169668/pexels-photo-6169668.jpeg?cs=srgb&dl=pexels-tima-miroshnichenko-6169668.jpg&fm=jpg')`;

  return (
    <Box bg={bgColor} py={8} px={4}>
      <Flex
        direction="column"
        align="center"
        justify="center"
        h={{ base: "60vh", md: "100vh" }}
        textAlign="center"
        bgImage={gradientBg}
        bgSize="cover"
        bgPosition="center"
        borderRadius={30}
        color="white"
      >
        <Heading as="h1" size="xl" mb={4}>
          Welcome to Logistics Inc.
        </Heading>
        <Text fontSize="lg" mb={8}>
          Your Trusted Partner for Reliable Logistics Solutions
        </Text>
        <Link to="/items">
          <Button colorScheme="blue" size="lg">
            Get Started
          </Button>
        </Link>
      </Flex>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-around"
        py={16}
      >
        <Box w={{ base: "100%", md: "45%" }} maxW="600px">
          <Image
            borderRadius={20}
            h={400}
            src="https://media.istockphoto.com/id/144235610/photo/white-delivery-truck.jpg?s=612x612&w=0&k=20&c=gQVsuTT74_pf4sudYpeP9sc_9phzThXpDvcIB0OjsO8="
            alt="Delivery Truck"
          />
          <Text fontSize={30} ml={10} mt={4}>
            Fast and Efficient Deliveries
          </Text>
        </Box>
        <Box w={{ base: "100%", md: "45%" }} maxW="600px">
          <Image
            borderRadius={20}
            h={400}
            src="https://img.sdcexec.com/files/base/acbm/scn/image/2022/02/MicrosoftTeams_image__1_.6202f6c4832ae.png?auto=format%2Ccompress&fit=crop&h=288&q=70&w=512"
            alt="Warehouse"
          />
          <Text fontSize={30} ml={10} mt={4}>
            Secure Storage and Warehousing
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default HomePage;
