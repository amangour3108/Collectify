// components/PartnerOrders.jsx
import OrderCard from "./OrderCard";

export default function PartnerOrders({ orders, onStatusUpdate }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Assigned Orders</h2>
      <div className="space-y-4">
        {orders.length === 0 ? (
          <p className="text-gray-500">No assigned orders available.</p>
        ) : (
          orders.map((order) => (
            <OrderCard key={order._id} order={order} onStatusUpdate={onStatusUpdate} />
          ))
        )}
      </div>
    </div>
  );
}
