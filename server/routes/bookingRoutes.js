const express = require("express");
const router = express.Router();
const Booking = require("../models/BookingModel");

// 💺 Config
const TOTAL_TABLES = 20;
const PRICE_PER_TABLE = 500;

// ============= CREATE BOOKING =============
router.post("/", async (req, res) => {
  try {
    const { name, email, date, time, guests } = req.body;

    // how many already booked for this slot
    const bookedCount = await Booking.countDocuments({
      date,
      time,
      bookingStatus: "CONFIRMED",
    });

    if (bookedCount >= TOTAL_TABLES) {
      return res.status(400).json({
        message: "No tables available for the selected time.",
      });
    }

    const amount = PRICE_PER_TABLE;

    const newBooking = new Booking({
      name,
      email,
      date,
      time,
      guests,
      amount,
      paymentStatus: "PENDING",
      bookingStatus: "CONFIRMED",
    });

    await newBooking.save();

    return res.status(201).json({
      message: "Table booked successfully!",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Error booking table" });
  }
});

// ============= SUMMARY (for banner) =============
router.get("/summary", async (req, res) => {
  try {
    const { date, time } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const query = { date, bookingStatus: "CONFIRMED" };
    if (time) query.time = time;

    const bookedCount = await Booking.countDocuments(query);
    const availableTables = Math.max(TOTAL_TABLES - bookedCount, 0);

    return res.json({
      totalTables: TOTAL_TABLES,
      bookedTables: bookedCount,
      availableTables,
      pricePerTable: PRICE_PER_TABLE,
    });
  } catch (error) {
    console.error("Summary error:", error);
    res.status(500).json({ message: "Error fetching table summary" });
  }
});

// ============= GET ALL BOOKINGS (admin) =============
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error("Fetch bookings error:", error);
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

// UPDATE PAYMENT / BOOKING STATUS
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus, bookingStatus } = req.body;

    console.log("PATCH /api/bookings", { id, body: req.body }); // 👀 debug

    // 1) Find the booking first
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // 2) Update fields safely
    if (paymentStatus) booking.paymentStatus = paymentStatus;
    if (bookingStatus) booking.bookingStatus = bookingStatus;

    // 3) Save changes
    await booking.save();

    return res.json({
      message: "Booking updated",
      booking,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return res.status(500).json({
      message: "Update failed on server",
      error: error.message,
    });
  }
});


module.exports = router;
