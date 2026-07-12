import DashboardLayout from "../../layouts/DashboardLayout";
import { Fuel as FuelIcon, IndianRupee, Droplets, Truck } from "lucide-react";

export default function Fuel() {
  const fuelLogs = [
    {
      vehicle: "KA01AB1234",
      driver: "Alex Kumar",
      liters: 45,
      cost: "₹4,050",
      date: "12 Jul 2026",
    },
    {
      vehicle: "KA05CD5678",
      driver: "Rahul Sharma",
      liters: 60,
      cost: "₹5,400",
      date: "11 Jul 2026",
    },
    {
      vehicle: "KA03EF1111",
      driver: "Priya Singh",
      liters: 38,
      cost: "₹3,420",
      date: "10 Jul 2026",
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Fuel Management</h1>

          <p className="text-gray-500 mt-2">
            Monitor vehicle fuel consumption and expenses
          </p>
        </div>

        <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl shadow-lg">
          + Add Fuel Log
        </button>
      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-4 gap-5 mb-8">
        <div className="bg-white rounded-xl shadow p-5 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Fuel Entries</p>
            <h2 className="text-3xl font-bold mt-2">126</h2>
          </div>

          <FuelIcon className="text-red-500" size={34} />
        </div>

        <div className="bg-white rounded-xl shadow p-5 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Fuel Used</p>
            <h2 className="text-3xl font-bold mt-2">1432 L</h2>
          </div>

          <Droplets className="text-blue-500" size={34} />
        </div>

        <div className="bg-white rounded-xl shadow p-5 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Monthly Cost</p>
            <h2 className="text-3xl font-bold mt-2">₹1.84L</h2>
          </div>

          <IndianRupee className="text-green-500" size={34} />
        </div>

        <div className="bg-white rounded-xl shadow p-5 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Vehicles Logged</p>
            <h2 className="text-3xl font-bold mt-2">24</h2>
          </div>

          <Truck className="text-amber-500" size={34} />
        </div>
      </div>

      {/* Fuel Log Table */}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Vehicle</th>

              <th>Driver</th>

              <th>Fuel (L)</th>

              <th>Cost</th>

              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {fuelLogs.map((log, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-4">{log.vehicle}</td>

                <td>{log.driver}</td>

                <td>{log.liters}</td>

                <td>{log.cost}</td>

                <td>{log.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
