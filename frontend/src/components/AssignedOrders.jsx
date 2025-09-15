// components/AssignedOrders.jsx
export default function AssignedOrders({ orders }) {
  const assignedOrders = orders.filter(order => order.assignedTo);
  return (
    <div className="backdrop-blur-lg bg-white/40 border border-white/30 shadow-xl p-6 rounded-2xl">
      <h2 className="text-xl font-extrabold mb-4 text-blue-900 drop-shadow">Assigned Orders</h2>
      {assignedOrders.length === 0 ? (
        <p className="text-gray-600">No assigned orders.</p>
      ) : (
        assignedOrders.map((order) => (
          <div key={order._id} className="mb-4 p-4 rounded-xl bg-white/60 border border-blue-100 shadow flex flex-col gap-1">
            <p className="font-semibold text-blue-800">Order ID: <span className="font-mono">{order._id}</span></p>
            <p>Status: <span className="font-semibold text-blue-700">{order.status}</span></p>
            <p>Amount: <span className="font-semibold text-green-700">₹{order.amount}</span></p>
            <p>Assigned To: <span className="font-semibold text-purple-700">{order.assignedTo?.name || order.assignedTo}</span></p>
          </div>
        ))
      )}
    </div>
  );
}