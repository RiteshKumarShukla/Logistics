import React from "react";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "../components/Home";
import Items from "../components/Items";
import Customers from "../components/Customers";
import DeliveryVehicles from "../components/DeliveryVehicles";
import Orders from "../components/Orders";
import ViewItem from "../components/ViewItem";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/items" element={<Items />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/delivery-vehicles" element={<DeliveryVehicles />} />
      <Route path="/view/:itemId" element={<ViewItem/>} />
      <Route path="/orders" element={<Orders />} />
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
