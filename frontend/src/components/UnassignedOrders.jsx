import React from "react";

export default function UnassignedOrders({ orders, partners, onAssign }) {
  const [selectedPartnerId, setSelectedPartnerId] = React.useState({});
  const [error, setError] = React.useState(null);

  const handleAssignClick = async (orderId) => {
    if (!selectedPartnerId[orderId]) {
      setError("Please select a partner first.");
      return;
    }
    await onAssign(orderId, selectedPartnerId[orderId]);
    setSelectedPartnerId({}); // Clear selection after assignment
    setError(null);
  };

  return (
  <div className="backdrop-blur-lg bg-white/40 border border-white/30 shadow-xl p-6 rounded-2xl">
  <h2 className="text-xl font-extrabold mb-4 text-blue-900 drop-shadow">Unassigned Orders</h2>
  {error && <p className="text-red-500 mb-4">{error}</p>}
      {orders.length > 0 ? (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order._id} className="mb-4 p-4 rounded-xl bg-white/60 border border-blue-100 shadow flex flex-col gap-1">
              <p className="font-semibold text-blue-800">Order ID: <span className="font-mono">{order._id}</span></p>
              <p>Street: <span className="font-semibold">{order.location?.street}</span></p>
              <p>City: <span className="font-semibold">{order.location?.city}</span></p>
              <p>State: <span className="font-semibold">{order.location?.state}</span></p>
              <p>Postal Code: <span className="font-semibold">{order.location?.postalCode}</span></p>
              <p>Amount: <span className="font-semibold text-green-700">₹{order.amount}</span></p>
              <div className="mt-2 flex items-center space-x-2">
                <select
                  className="p-2 border border-blue-200 bg-white/60 backdrop-blur-md rounded-lg shadow"
                  value={selectedPartnerId[order._id] || ""}
                  onChange={(e) =>
                    setSelectedPartnerId({
                      ...selectedPartnerId,
                      [order._id]: e.target.value,
                    })
                  }
                >
                  <option value="">Select a Partner</option>
                  {partners.map((partner) => (
                    <option key={partner.id} value={partner.id}>
                      {partner.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => handleAssignClick(order._id)}
                  className="bg-blue-500/80 text-white px-4 py-2 rounded-lg hover:bg-blue-600/90 backdrop-blur-md shadow"
                >
                  Assign
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No new unassigned orders.</p>
      )}
    </div>
  );
}