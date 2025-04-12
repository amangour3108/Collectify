export default function StatsCard({ completed }) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="font-semibold text-gray-700 mb-2">Performance</h2>
        <p className="text-lg">
          Completed Orders:{" "}
          <span className="font-medium text-indigo-600">{completed}</span>
        </p>
      </div>
    );
  }
  