import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/partners", authMiddleware, async (req, res) => {
  try {
    const partners = await User.find({ role: "pickupPartner" });
    res.json(partners);
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

// GET /api/partners
router.get("/partners", async (req, res) => {
  try {
    const partners = await User.find({ role: "pickupPartner" });
    console.log(partners);
    res.json(partners.map(p => ({ id: p._id, name: p.name })));
  } catch (error) {
    console.error("Error fetching partners:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


export default router;
