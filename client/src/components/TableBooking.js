// src/components/TableBooking.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

const API_URL = "http://localhost:5000/api/bookings";

const TableBooking = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    guests: "",
  });

  const [summary, setSummary] = useState(null);
  const [bookingResult, setBookingResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Fetch summary when date/time changes
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setError("");
        if (!formData.date) return;

        const res = await axios.get(`${API_URL}/summary`, {
          params: { date: formData.date, time: formData.time },
        });
        setSummary(res.data);
      } catch (err) {
        console.error(err);
        setError("Unable to load table availability. Please try again.");
      }
    };

    fetchSummary();
  }, [formData.date, formData.time]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setBookingResult(null);

    try {
      const res = await axios.post(API_URL, formData);
      setBookingResult(res.data.booking || null);
      alert("Table booked successfully!");
      setFormData({ name: "", email: "", date: "", time: "", guests: "" });
    } catch (err) {
      console.error(err);
      setError("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const amountToPay =
    summary?.pricePerTable || bookingResult?.amount || 0;

  // 🔹 Mark as paid from fake payment modal
  const handleFakePay = async () => {
    if (!bookingResult?._id) {
      console.error("No booking ID found for payment update");
      return;
    }

    try {
      const res = await axios.patch(`${API_URL}/${bookingResult._id}`, {
        paymentStatus: "PAID",
      });

      setBookingResult(res.data.booking);   // update UI with new status
      setShowPaymentModal(false);
      setError("");                         // clear any previous error
    } catch (err) {
      console.error("Payment update error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message ||
          "Payment update failed. Please try again."
      );
      // ❌ no alert here anymore
    }
  };

  return (
    <div className="book-table-page">
      <h2 className="booking-title">🍽️ Book a Table</h2>
      <p className="booking-subtitle">
        Reserve your spot at <span>SmartBite</span> in just a few clicks.
      </p>

      {/* Summary bar */}
      {summary && (
        <div className="table-summary">
          <div>🪑 Total: <b>{summary.totalTables}</b></div>
          <div>✅ Booked: <b>{summary.bookedTables}</b></div>
          <div>🟢 Available: <b>{summary.availableTables}</b></div>
          <div>💰 Price / table: <b>₹{summary.pricePerTable}</b></div>
        </div>
      )}

      {error && <p className="error-text">{error}</p>}

      <form className="form-card booking-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="guests"
          placeholder="Guests"
          value={formData.guests}
          onChange={handleChange}
          required
          min="1"
        />

        <div className="amount-box">
          Booking Amount: <b>₹{amountToPay}</b>
        </div>

        <button type="submit" className="booking-btn" disabled={loading}>
          {loading ? "Booking..." : "Book Table"}
        </button>
      </form>

      {/* Booking info + fake payment button */}
      {bookingResult && (
        <div className="booking-info-card">
          <h3>Booking Details</h3>
          <p className="booking-greeting">
            Thank you, <span>{bookingResult.name}</span>! 🎉
          </p>
          <p>
            Booking Status: <b>{bookingResult.bookingStatus}</b>
          </p>
          <p>
            Payment Status: <b>{bookingResult.paymentStatus}</b>
          </p>
          <p>
            Amount to Pay: <b>₹{bookingResult.amount}</b>
          </p>

          <button
            className="payment-btn"
            onClick={() => setShowPaymentModal(true)}
            disabled={bookingResult.paymentStatus === "PAID"}
          >
            {bookingResult.paymentStatus === "PAID"
              ? "Payment Completed ✅"
              : "Proceed to Payment"}
          </button>
        </div>
      )}

      {/* Fake Payment Modal */}
      {showPaymentModal && bookingResult && (
        <div className="payment-modal-backdrop">
          <div className="payment-modal">
            <h3>Fake Payment Gateway 💳</h3>
            <p>
              You are about to pay <b>₹{bookingResult.amount}</b> for your
              reservation at <b>SmartBite</b>.
            </p>
            <p className="payment-note">
              (Demo only – no real money. Click "Mark as Paid" to simulate a
              successful payment.)
            </p>

            <div className="payment-actions">
              <button onClick={handleFakePay}>Mark as Paid ✅</button>
              <button onClick={() => setShowPaymentModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableBooking;
