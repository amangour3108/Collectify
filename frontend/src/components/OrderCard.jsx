// components/OrderCard.jsx
export default function OrderCard({ order, onStatusUpdate }) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg text-gray-700">Order #{order._id.slice(-5)}</h3>
            <p className="text-sm text-gray-500">
              Status: <span className="font-medium text-blue-600">{order.status}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 rounded-lg bg-yellow-400 text-white hover:bg-yellow-500"
              onClick={() => onStatusUpdate(order._id, "In Progress")}
            >
              In Progress
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
              onClick={() => onStatusUpdate(order._id, "Completed")}
            >
              Complete
            </button>
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          Location: {order.location}
        </div>
      </div>
    );
  }
  