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
import { useNavigate } from "react-router-dom";

function Login({ onAuthentication }) {
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // If login is successful
      onAuthentication(true);
      navigate("/items"); 
    } else {
      // If login fails
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid credentials.",
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
        <Heading mb={4}>Log In</Heading>
        <Box
          p={4}
          boxShadow="lg"
          bg={useColorModeValue("white", "gray.700")}
          rounded="md"
          w="100%"
        >
          <form onSubmit={handleSubmit}>
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
            <Button
              type="submit"
              colorScheme="blue"
              w="100%"
            >
              Log In
            </Button>
          </form>
        </Box>
        <Link mt={4} href="/signup">
          Don't have an account? Sign up here.
        </Link>
      </Flex>
    </Container>
  );
}

export default Login;

