import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const API_URL = "http://localhost:5000/api/orders";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
        setLoading(true);
        setError("");
        const res = await axios.get(API_URL);
        console.log("Orders API response:", res.data); // 👀 see real shape in console
        const data = res.data;

    // 🔥 handle both:
    // 1) plain array: [ ... ]
    // 2) object with .orders: { success: true, orders: [...] }
        const list = Array.isArray(data) ? data : data.orders || [];
        setOrders(list);
    } catch (err) {
        console.error("Fetch orders error:", err);
        setError("Failed to load orders.");
    } finally {
        setLoading(false);
    }
};


  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const res = await axios.patch(`${API_URL}/${id}/status`, { status });
      const updated = res.data.order;

      setOrders((prev) =>
        prev.map((o) => (o._id === updated._id ? updated : o))
      );
    } catch (err) {
      console.error("Update status error:", err);
      alert("Could not update status. Check console.");
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this order?");
    if (!ok) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch (err) {
      console.error("Delete order error:", err);
      alert("Could not delete order. Check console.");
    }
  };

  const filteredOrders =
    filterStatus === "All"
      ? orders
      : orders.filter((o) => o.status === filterStatus);

  // Small stats for top summary bar
  const stats = orders.reduce(
    (acc, o) => {
      acc.total += 1;
      acc.revenue += o.total || 0;
      if (o.status === "Pending") acc.pending += 1;
      if (o.status === "Delivered") acc.delivered += 1;
      if (o.status === "Cancelled") acc.cancelled += 1;
      return acc;
    },
    { total: 0, pending: 0, delivered: 0, cancelled: 0, revenue: 0 }
  );

  const formatDate = (iso) =>
    iso ? new Date(iso).toLocaleString() : "-";

  const getStatusBadgeClass = (status) => {
    if (status === "Delivered") return "badge badge-green";
    if (status === "Cancelled") return "badge badge-red";
    return "badge badge-yellow"; // Pending / others
  };

  return (
    <div className="admin-page">
      <h2 className="admin-title">🧑‍🍳 Admin – Orders</h2>
      <p className="admin-subtitle">
        Track all food orders placed on <span>SmartBite</span> and manage their status.
      </p>

      {/* Summary cards */}
      <div className="admin-summary-row">
        <div className="admin-summary-card">
          <span className="admin-summary-label">Total Orders</span>
          <span className="admin-summary-value">{stats.total}</span>
        </div>
        <div className="admin-summary-card">
          <span className="admin-summary-label">Pending</span>
          <span className="admin-summary-value">{stats.pending}</span>
        </div>
        <div className="admin-summary-card">
          <span className="admin-summary-label">Delivered</span>
          <span className="admin-summary-value">{stats.delivered}</span>
        </div>
        <div className="admin-summary-card">
          <span className="admin-summary-label">Revenue</span>
          <span className="admin-summary-value">₹{stats.revenue}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-filter-bar">
        <div>
          <label>
            Filter by status:{" "}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </label>
        </div>
        <button onClick={fetchOrders}>Refresh</button>
      </div>

      {loading && <p>Loading orders...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && filteredOrders.length === 0 && (
        <p>No orders found for selected filter.</p>
      )}

      {!loading && filteredOrders.length > 0 && (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Contact</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Placed At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((o) => (
                <tr key={o._id}>
                  <td>{o.customerName || o.name}</td>
                  <td>
                    <div className="orders-meta">
                      {o.email && <div>📧 {o.email}</div>}
                      {o.phone && <div>📞 {o.phone}</div>}
                    </div>
                  </td>
                  <td>
                    <ul className="orders-items-list">
                      {o.items?.map((it, idx) => (
                        <li key={idx}>
                          {it.name} × {it.quantity} — ₹
                          {it.price * it.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>₹{o.total || o.totalAmount}</td>
                  <td>
                    <span className={getStatusBadgeClass(o.status)}>
                      {o.status}
                    </span>
                  </td>
                  <td>{formatDate(o.createdAt)}</td>
                  <td>
                    <button
                      onClick={() => handleStatusChange(o._id, "Delivered")}
                      disabled={o.status === "Delivered"}
                    >
                      Mark Delivered
                    </button>
                    <button
                      onClick={() => handleStatusChange(o._id, "Pending")}
                      disabled={o.status === "Pending"}
                    >
                      Set Pending
                    </button>
                    <button
                      onClick={() => handleStatusChange(o._id, "Cancelled")}
                      disabled={o.status === "Cancelled"}
                    >
                      Cancel
                    </button>
                    <button onClick={() => handleDelete(o._id)}>
                      Delete
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

export default AdminOrders;
