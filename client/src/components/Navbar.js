import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useCart } from "../context/CartContext";
import logo from "../images/logo.png"; // your logo import

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // safely extract cart array
  const cartContext = useCart ? useCart() : null;
  const cartArray =
    cartContext && Array.isArray(cartContext.cartItems)
      ? cartContext.cartItems
      : cartContext && Array.isArray(cartContext.cart)
      ? cartContext.cart
      : [];

  const cartCount = cartArray.length;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
      <div className="logo">
        <img src={logo} alt="SmartBite Logo" className="logo-img" />
        <span>SmartBite</span>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Menu</Link></li>

        <li className="cart-icon-wrapper">
          <Link to="/cart" className="cart-link">
            Cart
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>
        </li>

        <li><Link to="/booking">Book Table</Link></li>
        <li><Link to="/feedback">Send Feedback</Link></li>
        <li><Link to="/view-feedback">View Feedback</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>


      </ul>
    </nav>
  );
};

export default Navbar;
