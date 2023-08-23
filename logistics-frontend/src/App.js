import "./App.css";
import Footer from "./components/Footer";
import Mid from "./components/Mid";
import Navbar from "./components/Navbar";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <>
      <ChakraProvider>
        <Navbar />
        <Mid/>
        <Footer/>
      </ChakraProvider>
    </>
  );
}

export default App;
