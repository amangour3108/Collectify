export default function WalletCard({ balance }) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="font-semibold text-gray-700 mb-2">Wallet Balance</h2>
        <p className="text-2xl font-bold text-green-600">₹{balance}</p>
      </div>
    );
  }
  