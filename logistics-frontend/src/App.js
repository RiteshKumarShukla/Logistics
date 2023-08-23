import React from "react";
import Routex from "./routes/Routes";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Routex />
    </ChakraProvider>
  );
}

export default App;
