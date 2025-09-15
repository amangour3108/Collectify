import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";

export default function WalletTransfer() {
  const [form, setForm] = useState({ to: "", amount: "", purpose: "" });
  const [partners, setPartners] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await axios.get("/users/partners");
        setPartners(response.data);
      } catch (err) {
        console.error("Failed to fetch partners:", err);
        setError("Failed to load partners for transfer.");
      }
    };
    fetchPartners();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const payload = {
        to: form.to,
        amount: parseFloat(form.amount),
        purpose: form.purpose,
      };
      await axios.post("/wallet/transfer", payload);
      setMessage("Transfer successful!");
      setForm({ to: "", amount: "", purpose: "" }); // Clear the form
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during transfer.");
      console.error("Transfer failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="backdrop-blur-lg bg-white/40 border border-white/30 shadow-xl p-6 rounded-2xl space-y-4">
      <h2 className="text-2xl font-extrabold text-gray-800">Transfer to Partner</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {partners.length > 0 ? (
          <select
            name="to"
            value={form.to}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-3 bg-white/70 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          >
            <option value="">Select a Pickup Partner</option>
            {partners.map((partner) => (
              <option key={partner.id} value={partner.id}>
                {partner.name}
              </option>
            ))}
          </select>
        ) : (
          <p className="text-sm text-gray-500">No pickup partners available.</p>
        )}

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl p-3 bg-white/70 focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />
        <input
          type="text"
          name="purpose"
          placeholder="Purpose"
          value={form.purpose}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl p-3 bg-white/70 focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <button
          type="submit"
          className="w-full py-3 rounded-xl font-semibold text-white shadow-lg backdrop-blur-md bg-blue-600 hover:bg-blue-600/80 transition-colors disabled:opacity-60"
          disabled={loading || !form.to}
        >
          {loading ? "Transferring..." : "Transfer"}
        </button>

        {message && <p className="text-sm text-green-600 mt-2">{message}</p>}
        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
      </form>
    </div>
  );
}
