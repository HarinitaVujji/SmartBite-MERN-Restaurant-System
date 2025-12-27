// server.js

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import Routes
const feedbackRoutes = require("./routes/feedbackRoutes");
const foodRoutes = require("./routes/foodRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");


const app = express();

// ================= Middleware =================
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// ================= Routes =================
app.use("/api/feedback", feedbackRoutes); // Feedback routes
app.use("/api/foods", foodRoutes);        // Foods listing
app.use("/api/bookings", bookingRoutes);  // Table booking (updated)
app.use("/api/orders", orderRoutes);      // Order food
app.use("/api/auth", authRoutes);




// ================= Database Connection =================
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("🎉 MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// ================= Test Route =================
app.get("/", (req, res) => {
  res.send("Welcome to SmartBite Backend API 🚀");
});

// ================= Start Server =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 SmartBite Server running on http://localhost:${PORT}`)
);
