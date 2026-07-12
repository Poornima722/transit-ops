import DashboardLayout from "../../layouts/DashboardLayout";
import { Wrench, Calendar, AlertTriangle, CheckCircle } from "lucide-react";

export default function Maintenance() {
  const maintenance = [
    {
      vehicle: "KA01AB1234",
      service: "Oil Change",
      date: "15 Jul 2026",
      cost: "₹3,500",
      status: "Scheduled",
    },
    {
      vehicle: "KA05CD5678",
      service: "Brake Inspection",
      date: "10 Jul 2026",
      cost: "₹5,200",
      status: "Completed",
    },
    {
      vehicle: "KA03EF1111",
      service: "Tyre Replacement",
      date: "18 Jul 2026",
      cost: "₹18,000",
      status: "Pending",
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Maintenance Management</h1>

          <p className="text-gray-500 mt-2">
            Track vehicle servicing and maintenance schedules
          </p>
        </div>

        <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl shadow-lg">
          + Schedule Service
        </button>
      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-4 gap-5 mb-8">
        <div className="bg-white rounded-xl shadow p-5 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Total Services</p>
            <h2 className="text-3xl font-bold mt-2">18</h2>
          </div>
          <Wrench className="text-blue-600" size={34} />
        </div>

        <div className="bg-white rounded-xl shadow p-5 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Scheduled</p>
            <h2 className="text-3xl font-bold mt-2">5</h2>
          </div>
          <Calendar className="text-amber-500" size={34} />
        </div>

        <div className="bg-white rounded-xl shadow p-5 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Pending</p>
            <h2 className="text-3xl font-bold mt-2">2</h2>
          </div>
          <AlertTriangle className="text-red-500" size={34} />
        </div>

        <div className="bg-white rounded-xl shadow p-5 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Completed</p>
            <h2 className="text-3xl font-bold mt-2">11</h2>
          </div>
          <CheckCircle className="text-green-500" size={34} />
        </div>
      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Vehicle</th>
              <th>Service</th>
              <th>Date</th>
              <th>Cost</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {maintenance.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-4">{item.vehicle}</td>

                <td>{item.service}</td>

                <td>{item.date}</td>

                <td>{item.cost}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                    ${
                      item.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Scheduled"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
