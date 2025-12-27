import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";
import "../App.css";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();

  // Use cart from context, fallback to navigation data
  const items = cart.length ? cart : location.state?.cart || [];

  // Calculate total with quantity support
  const total = items.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!items.length) {
      alert("Your cart is empty.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/orders", {
        customerName: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        items: items.map((item) => ({
            foodId: item._id,
            name: item.name,
            price: item.price,
            quantity: item.quantity || 1,
        })),
        total,                 // field name matches model
        status: "Pending",     // 🔥 match your schema default

      });

      alert(`Order placed successfully for ₹${total}!`);
      clearCart();
      navigate("/");
    } catch (err) {
        console.error("Order placement failed:", err.response?.data || err.message);
        alert(
            err.response?.data?.message ||
            "Failed to place order. Please try again."
        );
    }
  };

  if (!items.length) {
    return (
      <div className="checkout-page">
        <div className="checkout-card">
          <h2>Checkout</h2>
          <p>Your cart is empty. Please add some items first.</p>
          <button
            className="checkout-confirm-btn"
            onClick={() => navigate("/")}
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-card">
        <h2 className="checkout-title">🧾 Checkout</h2>
        <p className="checkout-subtitle">
          Review your order and share delivery details to complete your purchase.
        </p>

        <div className="checkout-layout">
          {/* LEFT */}
          <div className="checkout-summary">
            <h3>Order Summary</h3>
            <ul className="checkout-list">
              {items.map((item, idx) => (
                <li key={item._id || idx} className="checkout-item">
                  <span>
                    {item.name} × {item.quantity || 1}
                  </span>
                  <span>₹{item.price * (item.quantity || 1)}</span>
                </li>
              ))}
            </ul>

            <div className="checkout-total-row">
              <span>Total</span>
              <span className="checkout-total-amount">₹{total}</span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="checkout-details">
            <h3>Customer Details</h3>
            <form className="checkout-form" onSubmit={handlePlaceOrder}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
              />

              <textarea
                name="address"
                placeholder="Delivery Address"
                rows="3"
                value={form.address}
                onChange={handleChange}
                required
              ></textarea>

              <button type="submit" className="checkout-confirm-btn">
                Confirm & Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
