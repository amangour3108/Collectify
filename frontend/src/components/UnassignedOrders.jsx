import { useState } from "react";
import axios from "../utils/axiosInstance";

export default function UnassignedOrders({ orders }) {
  const [partners, setPartners] = useState([]);
  const [loadedOrderId, setLoadedOrderId] = useState(null);

  const fetchPartners = async (orderId) => {
    if (loadedOrderId === orderId) return; // avoid refetching for same dropdown
    try {
      const response = await axios.get("/partners");
      console.log(response.data);
      setPartners(response.data);
      setLoadedOrderId(orderId);
    } catch (error) {
      console.error("Error fetching partners", error);
    }
  };

  const handleAssign = (orderId, partnerId) => {
    console.log(`Assigning ${orderId} to ${partnerId}`);
    // Optional: POST to /api/assign-order here
  };

  return (
    <div className="bg-white shadow p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Unassigned Orders</h2>
      {orders.length === 0 ? (
        <p>No unassigned orders.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className="mb-4 border p-3 rounded">
            <p><strong>Order ID:</strong> {order.id}</p>
            <select
              defaultValue=""
              onClick={() => fetchPartners(order.id)}
              onChange={e => handleAssign(order.id, e.target.value)}
              className="mt-2 border rounded px-3 py-1"
            >
              <option value="" disabled>Assign to partner</option>
              {partners.map(partner => (
                <option key={partner.id} value={partner.id}>
                  {partner.name}
                </option>
              ))}
            </select>
          </div>
        ))
      )}
    </div>
  );
}
