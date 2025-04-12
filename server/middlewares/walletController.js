import Wallet from "../models/Wallet.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

export const createWalletIfNotExists = async (userId) => {
  const existing = await Wallet.findOne({ user: userId });
  if (!existing) await Wallet.create({ user: userId });
};

export const getWallet = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ user: req.user._id });
    res.json(wallet);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch wallet" });
  }
};

export const transferFunds = async (req, res) => {
  try {
    const { to, amount, purpose } = req.body;

    const senderWallet = await Wallet.findOne({ user: req.user._id });
    const receiverWallet = await Wallet.findOne({ user: to });

    if (!senderWallet || !receiverWallet)
      return res.status(404).json({ error: "Wallet not found" });

    if (senderWallet.balance < amount)
      return res.status(400).json({ error: "Insufficient funds" });

    senderWallet.balance -= amount;
    receiverWallet.balance += amount;

    await senderWallet.save();
    await receiverWallet.save();

    await Transaction.create({
      from: req.user._id,
      to,
      amount,
      type: "debit",
      purpose,
    });

    await Transaction.create({
      from: req.user._id,
      to,
      amount,
      type: "credit",
      purpose,
    });

    res.json({ message: "Transfer successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Transfer failed" });
  }
};
