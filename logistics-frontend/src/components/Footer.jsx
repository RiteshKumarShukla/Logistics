import React from "react";
import { Box, Flex, Text, Link, useColorMode } from "@chakra-ui/react";

function Footer() {
  const { colorMode } = useColorMode();
  const bgColor = colorMode === "light" ? "blue.500" : "blue.900";
  const textColor = colorMode === "light" ? "gray.700" : "gray.300";

  return (
    <Box bg={bgColor} py={4}>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        px={{ base: 4, md: 8 }}
      >
        <Flex direction="column" align="flex-start">
          <Text fontSize="xl" fontWeight="bold" color="white" mb={2}>
            Logistics Inc.
          </Text>
          <Text fontSize="sm" color={textColor}>
            Your Trusted Partner in Logistics Solutions
          </Text>
        </Flex>
        <Flex mt={{ base: 4, md: 0 }} direction="column" align="flex-start">
          <Link href="#" color={textColor} mb={2}>
            Home
          </Link>
          <Link href="#" color={textColor} mb={2}>
            Services
          </Link>
          <Link href="#" color={textColor} mb={2}>
            About Us
          </Link>
          <Link href="#" color={textColor} mb={2}>
            Contact Us
          </Link>
        </Flex>
        <Flex mt={{ base: 4, md: 0 }} direction="column" align="flex-start">
          <Link href="#" color={textColor} mb={2}>
            Privacy Policy
          </Link>
          <Link href="#" color={textColor} mb={2}>
            Terms of Service
          </Link>
        </Flex>
      </Flex>
      <Text
        mt={4}
        textAlign="center"
        fontSize="sm"
        color={textColor}
      >
        &copy; {new Date().getFullYear()} Logistics Inc. All rights reserved.
      </Text>
    </Box>
  );
}

export default Footer;
