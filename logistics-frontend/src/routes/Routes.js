// src/routes/Routes.js
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "../components/Home";
import Items from "../components/Items";
import Customers from "../components/Customers";
import DeliveryVehicles from "../components/DeliveryVehicles";
import Orders from "../components/Orders";

function Routes() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/items" component={Items} />
        <Route path="/customers" component={Customers} />
        <Route path="/delivery-vehicles" component={DeliveryVehicles} />
        <Route path="/orders" component={Orders} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default Routes;
