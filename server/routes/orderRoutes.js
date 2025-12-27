// routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const Order = require("../models/OrderModel");

// POST /api/orders  -> create a new order
router.post("/", async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Order creation failed",
    });
  }
});

// GET /api/orders -> list all orders (for admin page)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    // 🔥 return plain array (simpler for frontend)
    res.json(orders);
  } catch (error) {
    console.error("Fetch orders error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching orders",
    });
  }
});

// PATCH /api/orders/:id/status -> update order status
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error("Update order status error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Unable to update status",
    });
  }
});

// DELETE /api/orders/:id -> delete order
router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Order removed successfully" });
  } catch (error) {
    console.error("Delete order error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Unable to delete order",
    });
  }
});

module.exports = router;
