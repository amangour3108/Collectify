import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET all partners (protected)
router.get("/partners", authMiddleware, async (req, res) => {
  try {
    const partners = await User.find({ role: "pickupPartner" });
    res.json(partners.map(p => ({ id: p._id, name: p.name })));
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch partners" });
  }
});

router.delete("/partner/:id", authMiddleware, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Partner deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete partner" });
  }
});

// GET a single user by ID (protected)
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;