import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import WalletTransfer from "../components/WalletTransfer";
import PartnerList from "../components/PartnerList";
import AssignedOrders from "../components/AssignedOrders";
import UnassignedOrders from "../components/UnassignedOrders";
import OrderFormPopup from "../components/OrderFormPopup";
import { useAuth } from "../utils/AuthContext";

export default function MCPDashboard() {
  const { user, logout } = useAuth();
  const [wallet, setWallet] = useState({ balance: 0 });
  const [stats, setStats] = useState({ totalOrders: 0, completedOrders: 0, pendingOrders: 0 });
  const [assignedOrders, setAssignedOrders] = useState([]);
  const [unassignedOrders, setUnassignedOrders] = useState([]);
  const [partners, setPartners] = useState([]);
  const [isOrderPopupOpen, setIsOrderPopupOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      const response = await axios.get("/mcp/orders/summary");
      setStats(response.data);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
      // Fallback to existing state on error
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        axios.get("/wallet").then(res => setWallet(res.data)),
        fetchStats(), // Fetch real stats data
        axios.get("/users/partners").then(res => setPartners(res.data)),
        axios.get("/mcp/unassigned-orders").then(res => setUnassignedOrders(res.data)),
        axios.get("/orders").catch(() => ({ data: [] })).then(res => setAssignedOrders(res.data.filter(order => order.assignedTo)))
      ]);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch data.");
      setLoading(false);
      console.error(err);
    }
  };

  const assignPartnerToOrder = async (orderId, partnerId) => {
    try {
      await axios.post("/mcp/assign-partner", { orderId, partnerId });
      fetchData(); // Refresh data after a successful assignment
    } catch (err) {
      setError(err.response?.data?.message || "Failed to assign partner.");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200/60 to-purple-200/60 p-6 flex flex-col items-center">
      <div className="w-full max-w-6xl space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-extrabold text-blue-900 drop-shadow-lg">MCP Dashboard</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setIsOrderPopupOpen(true)}
              className="backdrop-blur-md bg-green-600 text-white py-2 px-6 rounded-xl shadow-lg hover:bg-green-500/70 transition-colors border border-white/30"
            >
              Place New Order
            </button>
            <button
              onClick={handleLogout}
              className="backdrop-blur-md bg-red-600 text-white py-2 px-6 rounded-xl shadow-lg hover:bg-red-500/70 transition-colors border border-white/30"
            >
              Logout
            </button>
          </div>
        </div>
        <p className="text-2xl text-blue-500 font-medium">Welcome, {user?.name || "MCP User"}!</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="backdrop-blur-lg bg-white/40 border border-white/30 shadow-xl p-6 rounded-2xl flex flex-col items-center">
            <h2 className="font-semibold text-lg text-gray-700">Wallet Balance</h2>
            <p className="text-2xl font-extrabold text-blue-700 mt-2">₹{wallet.balance}</p>
          </div>

          <div className="backdrop-blur-lg bg-white/40 border border-white/30 shadow-xl p-6 rounded-2xl flex flex-col items-center">
            <h2 className="font-semibold text-lg text-gray-700">Performance</h2>
            <p className="mt-2 text-gray-800">Total Orders: <span className="font-bold">{stats.totalOrders}</span></p>
            <p className="text-gray-800">Completed: <span className="font-bold text-green-700">{stats.completedOrders}</span></p>
            <p className="text-gray-800">Pending: <span className="font-bold text-yellow-700">{stats.pendingOrders}</span></p>
          </div>

          <div className="backdrop-blur-lg bg-white/40 border border-white/30 shadow-xl p-6 rounded-2xl flex flex-col items-center">
            <h2 className="font-semibold text-lg text-gray-700">Notifications</h2>
            <p className="mt-2 text-gray-600">No new alerts</p>
          </div>
        </div>

        
        <WalletTransfer />
       

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AssignedOrders orders={assignedOrders} />
          <UnassignedOrders orders={unassignedOrders} partners={partners} onAssign={assignPartnerToOrder} />
        </div>
      </div>
      <OrderFormPopup 
        isOpen={isOrderPopupOpen} 
        onClose={() => setIsOrderPopupOpen(false)} 
        onOrderPlaced={fetchData} 
      />
    </div>
  );
}