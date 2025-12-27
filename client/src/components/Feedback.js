import React, { useState } from "react";
import axios from "axios";
import "./Feedback.css";

const Feedback = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false); // new status message

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/feedback", {
        name,
        email,
        message,
      });

      setSuccess(true); // success popup message
      setTimeout(() => setSuccess(false), 3000);

      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error("Feedback Error:", err);
    }
  };

  return (
    <div className="feedback-page">
      <div className="feedback-card">
        <h2 className="feedback-title">💬 Send Your Feedback</h2>
        <p className="feedback-subtitle">
          Your feedback helps us make <span>SmartBite</span> better every day! ❤️
        </p>

        <form className="feedback-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <textarea
            placeholder="Write your feedback here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            required
          />

          <button type="submit" className="feedback-btn">
            Submit Feedback
          </button>
        </form>

        {success && (
          <p className="success-note">
            🎉 Thank you for your valuable feedback <b>{name}</b>!
          </p>
        )}
      </div>
    </div>
  );
};

export default Feedback;
