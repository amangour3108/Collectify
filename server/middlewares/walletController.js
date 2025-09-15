import Wallet from "../models/Wallet.js";
import Transaction from "../models/Transaction.js";
import mongoose from "mongoose";

const getWallet = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ user: req.user.id });
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }
    res.status(200).json(wallet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const transferFunds = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { to, amount, purpose } = req.body;
    const from = req.user.id;

    if (amount <= 0) {
      throw new Error("Amount must be positive.");
    }

    const fromWallet = await Wallet.findOne({ user: from }).session(session);
    if (!fromWallet || fromWallet.balance < amount) {
      throw new Error("Insufficient funds.");
    }

    const toWallet = await Wallet.findOne({ user: to }).session(session);
    if (!toWallet) {
      throw new Error("Recipient not found.");
    }

    fromWallet.balance -= amount;
    await fromWallet.save({ session });

    toWallet.balance += amount;
    await toWallet.save({ session });

    const newTransaction = new Transaction({
      from,
      to,
      amount,
      type: "debit",
      purpose,
    });
    await newTransaction.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Funds transferred successfully", newBalance: fromWallet.balance });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: error.message });
  }
};

export { getWallet, transferFunds };