import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import WalletTransfer from "../components/WalletTransfer";
import PartnerList from "../components/PartnerList";
import AssignedOrders from "../components/AssignedOrders";
import UnassignedOrders from "../components/UnassignedOrders";

export default function MCPDashboard() {
  const [wallet, setWallet] = useState({ balance: 0 });
  const [stats, setStats] = useState({ totalOrders: 0, completedOrders: 0, pendingOrders: 0 });
  const [orders, setOrders] = useState([]);
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    fetchWallet();
    fetchStats();
    fetchOrders();
    fetchPartners();
  }, []);

  const fetchWallet = async () => {
    setWallet({ balance: 1500 });
  };

  const fetchStats = async () => {
    setStats({ totalOrders: 3, completedOrders: 1, pendingOrders: 2 });
  };

  const fetchOrders = async () => {
    const sampleOrders = [
      { id: "order1", status: "completed", assignedTo: "partner1" },
      { id: "order2", status: "pending", assignedTo: "partner2" },
      { id: "order3", status: "unassigned" },
      { id: "order4", status: "unassigned" },
    ];
    setOrders(sampleOrders);
  };

  const fetchPartners = async () => {
    try {
      const response = await axios.get("/users?role=pickupPartner");
      setPartners(response.data);
    } catch (error) {
      console.error("Failed to fetch pickup partners:", error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">MCP Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow p-4 rounded-lg">
          <h2 className="font-semibold">Wallet Balance</h2>
          <p className="text-xl font-bold">₹{wallet.balance}</p>
        </div>

        <div className="bg-white shadow p-4 rounded-lg">
          <h2 className="font-semibold">Performance</h2>
          <p>Total Orders: {stats.totalOrders}</p>
          <p>Completed Orders: {stats.completedOrders}</p>
          <p>Pending Orders: {stats.pendingOrders}</p>
        </div>

        <div className="bg-white shadow p-4 rounded-lg">
          <h2 className="font-semibold">Notifications</h2>
          <p>No new alerts</p>
        </div>
      </div>

      <WalletTransfer />
      <PartnerList />
      <AssignedOrders orders={orders.filter(order => order.assignedTo)} />
      <UnassignedOrders orders={orders.filter(order => !order.assignedTo)} partners={partners} />
    </div>
  );
}