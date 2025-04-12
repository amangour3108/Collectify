import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

export default function PartnerList() {
  const [partners, setPartners] = useState([]);
  const [newPartner, setNewPartner] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const fetchPartners = async () => {
    try {
      const res = await axios.get("/users/partners");
      setPartners(res.data);
    } catch (err) {
      console.error("Error fetching partners:", err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", {
        ...newPartner,
        role: "pickupPartner",
      });
      setMessage("Partner added successfully!");
      setNewPartner({ name: "", email: "", password: "" });
      fetchPartners();
    } catch (err) {
      setMessage("Failed to add partner");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/users/partner/${id}`);
      fetchPartners();
    } catch (err) {
      console.error("Failed to delete partner");
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  return (
    <div className="p-6 bg-white shadow rounded-lg space-y-6 mt-6">
      <h2 className="text-2xl font-bold">Pickup Partners</h2>

      <form onSubmit={handleAdd} className="space-y-3">
        <input
          type="text"
          placeholder="Name"
          value={newPartner.name}
          className="border border-gray-300 rounded w-full p-2"
          onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newPartner.email}
          className="border border-gray-300 rounded w-full p-2"
          onChange={(e) => setNewPartner({ ...newPartner, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={newPartner.password}
          className="border border-gray-300 rounded w-full p-2"
          onChange={(e) => setNewPartner({ ...newPartner, password: e.target.value })}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
          Add Partner
        </button>
        {message && <p className="text-sm text-green-600 mt-1">{message}</p>}
      </form>

      <ul className="divide-y divide-gray-200">
        {partners.map((partner) => (
          <li key={partner._id} className="py-3 flex justify-between items-center">
            <span className="font-medium">{partner.name} ({partner.email})</span>
            <button
              onClick={() => handleDelete(partner._id)}
              className="text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-50"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}