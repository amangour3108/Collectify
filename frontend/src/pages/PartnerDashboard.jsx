import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import WalletCard from "../components/Walletcard";
import StatsCard from "../components/StatsCard";
import OrderCard from "../components/OrderCard";

export default function PartnerDashboard() {
  const [orders, setOrders] = useState([]);
  const [wallet, setWallet] = useState(null);
  const [stats, setStats] = useState({ completed: 0, available: 0 });

  useEffect(() => {
    fetchOrders();
    fetchWallet();
    fetchStats();
  }, []);

  const fetchOrders = async () => {
    const sampleOrders = [
      {
        _id: "order12345",
        status: "Pending",
        location: "Sector 15, Gurgaon",
      },
      {
        _id: "order12346",
        status: "In Progress",
        location: "Connaught Place, Delhi",
      },
      {
        _id: "order12347",
        status: "Completed",
        location: "Indiranagar, Bangalore",
      },
    ];
    setOrders(sampleOrders);
    
  };

  const fetchWallet = async () => {
    try {
      const res = await axios.get("/wallet");
      setWallet(res.data);
    } catch (err) {
      console.error("Error fetching wallet", err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get("/orders/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching stats", err);
    }
  };

  const handleStatusUpdate = async (orderId, status) => {
    try {
      await axios.patch(`/orders/${orderId}/status`, { status });
      fetchOrders();
      fetchStats();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const handleAcceptOrder = async (orderId) => {
    try {
      await axios.post(`/orders/${orderId}/accept`);
      fetchOrders();
    } catch (err) {
      console.error("Failed to accept order", err);
    }
  };

  const handleRejectOrder = async (orderId) => {
    try {
      await axios.post(`/orders/${orderId}/reject`);
      fetchOrders();
    } catch (err) {
      console.error("Failed to reject order", err);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800">Partner Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <WalletCard balance={wallet?.balance} />
        <StatsCard completed={stats.completed} available={stats.available} />
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="font-semibold text-gray-700 mb-2">Wallet Actions</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Request Withdrawal</button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Orders</h2>
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              onAccept={handleAcceptOrder}
              onReject={handleRejectOrder}
              onUpdateStatus={handleStatusUpdate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}