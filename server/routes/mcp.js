import express from "express";
const router = express.Router();
import orders from "../orders.js";

// GET /mcp/orders/summary
router.get("/orders/summary", (req, res) => {
  const mcpId = req.user.id; // assuming MCP is authenticated and ID is in token

  const mcpOrders = orders.filter(order => order.mcpId === mcpId);

  const totalOrders = mcpOrders.length;
  const completedOrders = mcpOrders.filter(order => order.status === "Completed").length;
  const pendingOrders = mcpOrders.filter(order => order.status === "Pending" || order.status === "In Progress").length;

  res.json({ totalOrders, completedOrders, pendingOrders });
});

export default router;
