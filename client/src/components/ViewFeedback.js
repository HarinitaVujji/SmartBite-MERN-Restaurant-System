import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Feedback.css";

function ViewFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setError("");
        const res = await axios.get("http://localhost:5000/api/feedback");

        // newest first
        const sorted = [...res.data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setFeedbacks(sorted);
      } catch (err) {
        console.error(err);
        setError("Unable to load feedback right now. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const getInitial = (name = "") =>
    name.trim() ? name.trim().charAt(0).toUpperCase() : "G";

  return (
    <div className="feedback-view-page">
      <div className="feedback-view-header">
        <h2 className="feedback-view-title">📋 Customer Feedback</h2>
        <p className="feedback-view-subtext">
          Hear what our diners are saying about <span>SmartBite</span> 🍽️
        </p>
      </div>

      {loading && <p className="feedback-loading">Loading feedback...</p>}
      {error && <p className="feedback-error">{error}</p>}

      {!loading && !error && feedbacks.length === 0 && (
        <p className="no-feedback">No feedback available yet.</p>
      )}

      {!loading && !error && feedbacks.length > 0 && (
        <div className="feedback-list-grid">
          {feedbacks.map((fb) => (
            <div className="feedback-card-item" key={fb._id}>
              <div className="feedback-card-top">
                <div className="feedback-avatar">
                  {getInitial(fb.name)}
                </div>
                <div>
                  <h3 className="feedback-name">
                    {fb.name || "Guest"}
                  </h3>
                  {fb.createdAt && (
                    <p className="feedback-date">
                      🕒 {new Date(fb.createdAt).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>

              <p className="feedback-message">“{fb.message}”</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewFeedback;
