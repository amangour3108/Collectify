import express from "express";
import { getWallet, transferFunds } from "../middlewares/walletController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getWallet);
router.post("/transfer", authMiddleware, transferFunds);

export default router;