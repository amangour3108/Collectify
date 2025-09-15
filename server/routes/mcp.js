import express from "express";
const router = express.Router();
import Order from "../models/Order.js";
import User from "../models/User.js";
import authMiddleware from "../middlewares/authMiddleware.js";

router.get("/orders/summary", authMiddleware, async (req, res) => {
  try {
    const mcpId = req.user.id;
    // Fetch all orders from the database
    const allOrders = await Order.find();

    // Filter orders relevant to the MCP. In a real-world scenario, you might filter by a geographic region or other criteria.
    const relevantOrders = allOrders; 

    const totalOrders = relevantOrders.length;
    const completedOrders = relevantOrders.filter(order => order.status === "Completed").length;
    const pendingOrders = relevantOrders.filter(order => order.status === "Pending" || order.status === "In Progress").length;

    res.json({ totalOrders, completedOrders, pendingOrders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /mcp/unassigned-orders
router.get("/unassigned-orders", authMiddleware, async (req, res) => {
  try {
    const unassignedOrders = await Order.find({ assignedTo: null });
    res.status(200).json(unassignedOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /mcp/assign-partner
router.post("/assign-partner", authMiddleware, async (req, res) => {
  try {
    const { orderId, partnerId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    const partner = await User.findById(partnerId);
    if (!partner || partner.role !== "pickupPartner") {
      return res.status(400).json({ message: "Invalid partner" });
    }

    order.assignedTo = partnerId;
    order.status = "In Progress";
    await order.save();

    res.status(200).json({ message: "Order assigned successfully", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;