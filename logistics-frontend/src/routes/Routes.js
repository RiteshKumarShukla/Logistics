import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom"; 
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "../components/Home";
import Items from "../components/Items";
import Customers from "../components/Customers";
import DeliveryVehicles from "../components/DeliveryVehicles";
import Orders from "../components/Orders";
import ViewItem from "../components/ViewItem";
import Login from "../components/Login";
import Signup from "../components/Signup";

function PrivateRoute({ element, authenticated }) {
  return authenticated ? element : <Navigate to="/login" />;
}

function AppRoutes() {
  const [authenticated, setAuthenticated] = useState(false);

  // Function to set authentication status
  const handleAuthentication = (status) => {
    setAuthenticated(status);
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login onAuthentication={handleAuthentication} />} />
      <Route path="/signup" element={<Signup />} />

      {/* Make the rest of them private */}
      <Route
        path="/items"
        element={<PrivateRoute element={<Items />} authenticated={authenticated} />}
      />
      <Route
        path="/customers"
        element={<PrivateRoute element={<Customers />} authenticated={authenticated} />}
      />
      <Route
        path="/delivery-vehicles"
        element={<PrivateRoute element={<DeliveryVehicles />} authenticated={authenticated} />}
      />
      <Route
        path="/view/:itemId"
        element={<PrivateRoute element={<ViewItem />} authenticated={authenticated} />}
      />
      <Route
        path="/orders"
        element={<PrivateRoute element={<Orders />} authenticated={authenticated} />}
      />
    </Routes>
  );
}

function Routex() {
  return (
    <>
      <Navbar />
      <AppRoutes />
      <Footer />
    </>
  );
}

export default Routex;
