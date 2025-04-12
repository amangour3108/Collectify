import { useState } from "react";
import axios from "../utils/axiosInstance";

export default function WalletTransfer() {
  const [form, setForm] = useState({ to: "", amount: "", purpose: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/wallet/transfer", form);
      setMessage("Transfer successful!");
    } catch (err) {
      setMessage(err.response?.data?.error || "Error");
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg space-y-4">
      <h2 className="text-xl font-bold">Transfer to Partner</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="Pickup Partner ID"
          className="w-full border border-gray-300 rounded p-2"
          onChange={(e) => setForm({ ...form, to: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          className="w-full border border-gray-300 rounded p-2"
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
        <input
          type="text"
          placeholder="Purpose"
          className="w-full border border-gray-300 rounded p-2"
          onChange={(e) => setForm({ ...form, purpose: e.target.value })}
        />
        <button type="submit" className="bg-blue-600 text-white rounded p-2 w-full">
          Transfer
        </button>
        {message && <p className="text-sm text-green-600 mt-1">{message}</p>}
      </form>
    </div>
  );
}
