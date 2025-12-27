import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="sb-footer">
      <div className="sb-footer-inner">
        {/* Brand / intro */}
        <div className="sb-footer-col brand">
          <h3>SmartBite 🍴</h3>
          <p>
            Fresh, hot and tasty food delivered to your doorstep. Biryani, pizza,
            burgers, pastas and more in just a few clicks.
          </p>
        </div>

        {/* Quick links */}
        <div className="sb-footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="#menu-section">Our Menu</a>
            </li>
            <li>
              <a href="#offers">Special Offers</a>
            </li>
            <li>
              <a href="/booking">Book a Table</a>
            </li>
            <li>
              <a href="/feedback">Send Feedback</a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="sb-footer-col">
          <h4>Contact</h4>
          <p>📍 Visakhapatnam, India</p>
          <p>📞 +91-98765-43210</p>
          <p>📧 support@smartbite.com</p>
        </div>

        {/* Newsletter + Social */}
        <div className="sb-footer-col newsletter">
          <h4>Stay Updated</h4>
          <p>Get offers, new dishes &amp; updates in your inbox.</p>

          <form
            className="sb-footer-newsletter-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
          <p className="sb-footer-newsletter-note">
            We respect your privacy. No spam, only yum 😋
          </p>

          <div className="sb-footer-social">
            {/* You can replace # with your real profiles later */}
            <a
              href="#"
              className="social-ig"
              aria-label="SmartBite on Instagram"
            >
              📸
            </a>
            <a
              href="#"
              className="social-tw"
              aria-label="SmartBite on Twitter"
            >
              🐦
            </a>
            <a
              href="#"
              className="social-fb"
              aria-label="SmartBite on Facebook"
            >
              👍
            </a>
            <a
              href="#"
              className="social-yt"
              aria-label="SmartBite on YouTube"
            >
              ▶️
            </a>
            <a
              href="#"
              className="social-wa"
              aria-label="SmartBite on WhatsApp"
            >
              💬
            </a>
          </div>
        </div>
      </div>

      <div className="sb-footer-bottom">
        <p>© {new Date().getFullYear()} SmartBite. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
