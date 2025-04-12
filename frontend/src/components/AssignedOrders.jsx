// components/AssignedOrders.jsx
export default function AssignedOrders({ orders }) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Assigned Orders</h2>
        {orders.length === 0 ? (
          <p>No assigned orders.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="border p-2 mb-2 rounded">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Assigned To:</strong> {order.assignedTo}</p>
            </div>
          ))
        )}
      </div>
    );
  }
  