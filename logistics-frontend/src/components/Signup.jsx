import React, { useState } from "react";
import {
  Container,
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import axios from "axios";

function Signup() {
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://logistic-cyvh.onrender.com/api/users/signup",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );

      // Registration success
      Swal.fire({
        icon: "success",
        title: "Signup Successful!",
        text: "You have successfully signed up.",
      });

      // Clear form data
      setFormData({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Error signing up:", error);
      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to sign up. Please try again.",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Container maxW="sm" py={8}>
      <Flex direction="column" align="center">
        <Heading mb={4}>Sign Up</Heading>
        <Box
          p={4}
          boxShadow="lg"
          bg={useColorModeValue("white", "gray.700")}
          rounded="md"
          w="100%"
        >
          <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" w="100%">
              Sign Up
            </Button>
          </form>
        </Box>
        <Link mt={4} href="/login">
          Already have an account? Log in here.
        </Link>
      </Flex>
    </Container>
  );
}

export default Signup;
