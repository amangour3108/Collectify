import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { useAuth } from "../utils/AuthContext";

export default function PartnerDashboard() {
  const { user, logout } = useAuth();
  const [myOrders, setMyOrders] = useState([]);
  const [wallet, setWallet] = useState({ balance: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [ordersRes, walletRes] = await Promise.all([
        axios.get("/orders"),
        axios.get("/wallet")
      ]);

      setMyOrders(ordersRes.data);
      setWallet(walletRes.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch data.");
      setLoading(false);
      console.error(err);
    }
  };

  const handleCompleteOrder = async (orderId) => {
    try {
      await axios.put(`/orders/${orderId}`, { status: "Completed" });
      fetchData();
      alert("Order marked as completed!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to complete order.");
    }
  };
  
  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }
  
  const pendingOrders = myOrders.filter(order => order.status === "Pending" || order.status === "In Progress");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200/60 to-purple-200/60 p-6 flex flex-col items-center">
      <div className="w-full max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-extrabold text-blue-900 drop-shadow-lg">Partner Dashboard</h1>
          <button
            onClick={handleLogout}
            className="backdrop-blur-md bg-red-600 text-white py-2 px-6 rounded-xl shadow-lg hover:bg-red-500/70 transition-colors border border-white/30"
          >
            Logout
          </button>
        </div>

        <p className="text-2xl text-blue-500 font-medium">Welcome, {user?.name || "Pickup Partner"}!</p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="backdrop-blur-lg bg-white/40 border border-white/30 shadow-xl p-6 rounded-2xl flex flex-col items-center">
            <h2 className="font-semibold text-lg text-gray-700">Total Orders</h2>
            <p className="text-2xl font-extrabold text-blue-700 mt-2">{myOrders.length}</p>
          </div>

          <div className="backdrop-blur-lg bg-white/40 border border-white/30 shadow-xl p-6 rounded-2xl flex flex-col items-center">
            <h2 className="font-semibold text-lg text-gray-700">Pending Orders</h2>
            <p className="text-2xl font-extrabold text-yellow-700 mt-2">{pendingOrders.length}</p>
          </div>

          {/* Wallet Balance (same style as others) */}
          <div className="backdrop-blur-lg bg-white/40 border border-white/30 shadow-xl p-6 rounded-2xl flex flex-col items-center">
            <h2 className="font-semibold text-lg text-gray-700">Wallet Balance</h2>
            <p className="text-2xl font-extrabold text-green-700 mt-2">₹{wallet.balance}</p>
          </div>
        </div>

        {/* Orders */}
        <h2 className="text-2xl font-bold text-gray-800 mt-6">My Assigned Orders</h2>
        <div className="space-y-4">
          {pendingOrders.length > 0 ? (
            pendingOrders.map((order) => (
              <div
                key={order.id}
                className="backdrop-blur-lg bg-white/40 border border-white/30 shadow-xl p-6 rounded-2xl flex justify-between items-center"
              >
                <div className="text-gray-700">
                  <p><span className="font-semibold">Order ID:</span> {order.id}</p>
                  <p><span className="font-semibold">Status:</span> {order.status}</p>
                  <p><span className="font-semibold">Amount:</span> ₹{order.amount}</p>
                  <p><span className="font-semibold">Street:</span> {order.location?.street}</p>
                  <p><span className="font-semibold">City:</span> {order.location?.city}</p>
                  <p><span className="font-semibold">State:</span> {order.location?.state}</p>
                  <p><span className="font-semibold">Postal Code:</span> {order.location?.postalCode}</p>
                </div>
                <button
                  onClick={() => handleCompleteOrder(order.id)}
                  className="backdrop-blur-md bg-green-600 text-white py-2 px-4 rounded-xl shadow-lg hover:bg-green-500/70 transition-colors border border-white/30"
                >
                  Mark as Completed
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No new orders assigned.</p>
          )}
        </div>

        {/* Completed Orders Section */}
        <h2 className="text-2xl font-bold text-gray-800 mt-10">My Completed Orders</h2>
        <div className="space-y-4">
          {myOrders.filter(order => order.status === "Completed").length > 0 ? (
            myOrders.filter(order => order.status === "Completed").map((order) => (
              <div
                key={order.id}
                className="backdrop-blur-lg bg-white/40 border border-white/30 shadow-xl p-6 rounded-2xl flex justify-between items-center"
              >
                <div className="text-gray-700">
                  <p><span className="font-semibold">Order ID:</span> {order.id}</p>
                  <p><span className="font-semibold">Status:</span> {order.status}</p>
                  <p><span className="font-semibold">Amount:</span> ₹{order.amount}</p>
                  <p><span className="font-semibold">Street:</span> {order.location?.street}</p>
                  <p><span className="font-semibold">City:</span> {order.location?.city}</p>
                  <p><span className="font-semibold">State:</span> {order.location?.state}</p>
                  <p><span className="font-semibold">Postal Code:</span> {order.location?.postalCode}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No completed orders yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
