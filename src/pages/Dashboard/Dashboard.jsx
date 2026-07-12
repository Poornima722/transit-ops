import DashboardLayout from "../../layouts/DashboardLayout";
import {
  Truck,
  Users,
  Route,
  Wrench,
  IndianRupee,
  Fuel,
  Plus,
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Vehicles",
      value: 24,
      icon: <Truck size={30} />,
      color: "bg-blue-500",
    },
    {
      title: "Drivers",
      value: 18,
      icon: <Users size={30} />,
      color: "bg-green-500",
    },
    {
      title: "Active Trips",
      value: 12,
      icon: <Route size={30} />,
      color: "bg-amber-500",
    },
    {
      title: "Maintenance Due",
      value: 4,
      icon: <Wrench size={30} />,
      color: "bg-red-500",
    },
  ];

  return (
    <DashboardLayout>
      {/* Header */}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Fleet Dashboard</h1>

          <p className="text-gray-500 mt-2">
            Welcome back! Here's today's fleet overview.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2">
            <Plus size={18} />
            New Trip
          </button>

          <button className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 rounded-xl">
            Add Vehicle
          </button>
        </div>
      </div>

      {/* KPI Cards */}

      <div className="grid grid-cols-4 gap-6">
        {stats.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-xl shadow-lg p-6 flex justify-between items-center hover:shadow-xl transition"
          >
            <div>
              <p className="text-gray-500">{card.title}</p>

              <h2 className="text-4xl font-bold mt-2">{card.value}</h2>
            </div>

            <div className={`${card.color} text-white p-4 rounded-xl`}>
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}

      <div className="grid grid-cols-3 gap-6 mt-8">
        {/* Recent Trips */}

        <div className="col-span-2 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Trips</h2>

          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3">Vehicle</th>

                <th>Driver</th>

                <th>Destination</th>

                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3">KA01AB1234</td>

                <td>Alex Kumar</td>

                <td>Mysore</td>

                <td>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    Dispatched
                  </span>
                </td>
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className="p-3">KA05CD5678</td>

                <td>Rahul Sharma</td>

                <td>Hubli</td>

                <td>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    Completed
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="p-3">KA03EF1111</td>

                <td>Priya Singh</td>

                <td>Mangalore</td>

                <td>
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                    Draft
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Sidebar */}

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="font-semibold mb-4">Fleet Status</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Available</span>

                <span className="font-bold text-green-600">15</span>
              </div>

              <div className="flex justify-between">
                <span>On Trip</span>

                <span className="font-bold text-blue-600">6</span>
              </div>

              <div className="flex justify-between">
                <span>Maintenance</span>

                <span className="font-bold text-orange-600">3</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="font-semibold mb-4">Today's Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  <Fuel size={18} />
                  Fuel Used
                </span>

                <span>320 L</span>
              </div>

              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  <IndianRupee size={18} />
                  Revenue
                </span>

                <span>₹2.4L</span>
              </div>

              <div className="flex justify-between">
                <span>Trips Completed</span>

                <span>8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
