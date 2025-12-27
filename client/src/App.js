// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Feedback from "./components/Feedback";
import ViewFeedback from "./components/ViewFeedback";
import Menu from "./components/Menu";
import TableBooking from "./components/TableBooking";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";          // 👈 NEW
import { CartProvider } from "./context/CartContext";
import AdminBookings from "./components/AdminBookings";
import Checkout from "./components/Checkout";
import AdminOrders from "./components/AdminOrders";
import Login from "./components/Login";
import Signup from "./components/Signup";

import "./App.css";

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/booking" element={<TableBooking />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/view-feedback" element={<ViewFeedback />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>

        <Footer />   {/* 👈 footer on all pages */}
      </Router>
    </CartProvider>
  );
}

export default App;
