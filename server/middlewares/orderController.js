import Order from "../models/Order.js";

const createOrder = async (req, res) => {
  try {
    const { location, assignedTo, amount } = req.body;
    if (typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({ message: "Order amount must be a positive number." });
    }
    const newOrder = new Order({
      location,
      assignedTo,
      amount,
      status: "Pending",
    });
    const order = await newOrder.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const { role, id } = req.user;
    let orders;
    if (role === "microCollectionPartner") {
      orders = await Order.find().populate("assignedTo", "name");
    } else if (role === "pickupPartner") {
      orders = await Order.find({ assignedTo: id }).populate("assignedTo", "name");
    } else {
      orders = await Order.find().populate("assignedTo", "name");
    }
    // Map orders to include id, status, createdAt, location, amount, assignedTo
    const mappedOrders = orders.map(order => ({
      id: order._id.toString(),
      status: order.status,
      createdAt: order.createdAt,
      location: order.location,
      amount: order.amount,
      assignedTo: order.assignedTo?.name || order.assignedTo || null
    }));
    res.status(200).json(mappedOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, assignedTo, amount } = req.body;
    const updateFields = { status, assignedTo };
    if (amount !== undefined) updateFields.amount = amount;
    const prevOrder = await Order.findById(id);
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      updateFields,
      { new: true }
    );

    // If status changed to Completed and was not previously Completed
    if (status === "Completed" && prevOrder.status !== "Completed" && updatedOrder.assignedTo) {
      const Wallet = (await import("../models/Wallet.js")).default;
      const User = (await import("../models/User.js")).default;
      // Find the pickup partner (assignedTo)
      const pickupPartner = await User.findById(updatedOrder.assignedTo);
      // Find the collection partner (the user who created the order)
      // For this logic, assume the order has a createdBy field (if not, fallback to the first MCP)
      let mcpUser = null;
      if (prevOrder.createdBy) {
        mcpUser = await User.findById(prevOrder.createdBy);
      } else {
        // Fallback: find any microCollectionPartner
        mcpUser = await User.findOne({ role: "microCollectionPartner" });
      }
      if (mcpUser) {
        const mcpWallet = await Wallet.findOne({ user: mcpUser._id });
        if (mcpWallet) {
          mcpWallet.balance += updatedOrder.amount;
          await mcpWallet.save();
        }
      }
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createOrder, getOrders, updateOrder, deleteOrder };