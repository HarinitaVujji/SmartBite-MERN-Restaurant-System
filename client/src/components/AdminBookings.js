import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const API_URL = "http://localhost:5000/api/bookings";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(API_URL);
      setBookings(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdate = async (id, updates) => {
    try {
      const res = await axios.patch(`${API_URL}/${id}`, updates);
      const updated = res.data.booking;

      setBookings((prev) =>
        prev.map((b) => (b._id === updated._id ? updated : b))
      );
    } catch (err) {
      console.error(err);
      alert("Update failed. Check console.");
    }
  };

  const filtered = filterDate
    ? bookings.filter((b) => b.date === filterDate)
    : bookings;

  return (
    <div className="admin-page">
      <h2 className="admin-title">🧑‍💼 Admin – Table Bookings</h2>
      <p className="admin-subtitle">
        Manage customer reservations, payments and statuses for <span>SmartBite</span>.
      </p>

      <div className="admin-filter-bar">
        <div>
          <label>
            Filter by date:{" "}
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </label>
        </div>
        <button onClick={fetchBookings}>Refresh</button>
      </div>

      {loading && <p>Loading bookings...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && filtered.length === 0 && (
        <p>No bookings found for selected date.</p>
      )}

      {!loading && filtered.length > 0 && (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date & Time</th>
                <th>Guests</th>
                <th>Amount</th>
                <th>Booking Status</th>
                <th>Payment Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b._id}>
                  <td>{b.name}</td>
                  <td>
                    {b.date} <br />
                    <span className="admin-time">{b.time}</span>
                  </td>
                  <td>{b.guests}</td>
                  <td>₹{b.amount}</td>
                  <td>
                    <span
                      className={
                        b.bookingStatus === "CONFIRMED"
                          ? "badge badge-green"
                          : "badge badge-red"
                      }
                    >
                      {b.bookingStatus}
                    </span>
                  </td>
                  <td>
                    <span
                      className={
                        b.paymentStatus === "PAID"
                          ? "badge badge-green"
                          : b.paymentStatus === "FAILED"
                          ? "badge badge-red"
                          : "badge badge-yellow"
                      }
                    >
                      {b.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        handleUpdate(b._id, { paymentStatus: "PAID" })
                      }
                      disabled={b.paymentStatus === "PAID"}
                    >
                      Mark Paid
                    </button>
                    <button
                      onClick={() =>
                        handleUpdate(b._id, { paymentStatus: "PENDING" })
                      }
                      disabled={b.paymentStatus === "PENDING"}
                    >
                      Set Pending
                    </button>
                    <button
                      onClick={() =>
                        handleUpdate(b._id, { bookingStatus: "CANCELLED" })
                      }
                      disabled={b.bookingStatus === "CANCELLED"}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
