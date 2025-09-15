import { useState } from "react";
import axios from "../utils/axiosInstance";

export default function OrderFormPopup({ isOpen, onClose, onOrderPlaced }) {
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const newOrder = {
      location: {
        street,
        city,
        state,
        postalCode,
      },
      amount: parseFloat(amount),
    };

    try {
      await axios.post("/orders", newOrder);
      onOrderPlaced(); // Call the parent function to refresh the dashboard
      onClose(); // Close the modal on success
      alert("New order placed successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-200/60 to-purple-200/60 bg-opacity-60 backdrop-blur-sm overflow-y-auto h-full w-full flex justify-center items-center z-50">
      <div className="backdrop-blur-2xl bg-white/40 border border-white/30 shadow-2xl p-8 rounded-2xl w-96">
  <h2 className="text-2xl font-extrabold mb-4 text-blue-900 drop-shadow">Place New Order</h2>
  {error && <p className="text-red-500 mb-4">{error}</p>}
  <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Order Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-blue-200 bg-white/60 backdrop-blur-md rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              required
              min="0.01"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Street / Address Line</label>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-blue-200 bg-white/60 backdrop-blur-md rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-blue-200 bg-white/60 backdrop-blur-md rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">State / Province</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-blue-200 bg-white/60 backdrop-blur-md rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Postal Code / Zip Code</label>
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-blue-200 bg-white/60 backdrop-blur-md rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              required
            />
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white/60 border border-gray-300 rounded-lg hover:bg-gray-100 backdrop-blur-md shadow"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold text-white bg-green-500/80 rounded-lg hover:bg-green-600/90 disabled:bg-gray-400 backdrop-blur-md shadow"
              disabled={loading}
            >
              {loading ? "Placing..." : "Place Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}