import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";   // 👈 add this
import "../App.css";

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();                 // 👈 hook for navigation

  // safely calculate total
  const total = cart.reduce((acc, item) => acc + (item.price || 0), 0);

  const handleCheckout = () => {
    if (!cart.length) return;

    // go to /checkout and pass cart details
    navigate("/checkout", {
      state: {
        cart,
        total,
      },
    });
  };

  return (
    <div className="cart-page">
      <h1 className="cart-title">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p className="cart-empty">
          Your cart is empty. Go back and add something tasty!
        </p>
      ) : (
        <>
          <ul className="cart-items">
            {cart.map((item, index) => (
              <li key={item._id || index} className="cart-item">
                <div className="cart-item-info">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-price">₹{item.price}</span>
                </div>
                <button
                  className="cart-remove"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <div>
              <p className="cart-total-label">Items: {cart.length}</p>
              <p className="cart-total-amount">Total: ₹{total}</p>
            </div>

            {/* 👇 wired checkout button */}
            <button
              className="cart-checkout-btn"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
