import DashboardLayout from "../../layouts/DashboardLayout";
import { BarChart3, IndianRupee, Truck, Route, TrendingUp } from "lucide-react";

export default function Reports() {
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Reports & Analytics</h1>

          <p className="text-gray-500 mt-2">
            Monitor fleet performance and business insights
          </p>
        </div>

        <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl shadow-lg">
          Generate Report
        </button>
      </div>

      {/* KPI Cards */}

      <div className="grid grid-cols-4 gap-5 mb-8">
        <div className="bg-white rounded-xl shadow p-5 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Total Trips</p>
            <h2 className="text-3xl font-bold mt-2">326</h2>
          </div>

          <Route className="text-blue-500" size={34} />
        </div>

        <div className="bg-white rounded-xl shadow p-5 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Fleet Utilization</p>
            <h2 className="text-3xl font-bold mt-2">89%</h2>
          </div>

          <Truck className="text-green-500" size={34} />
        </div>

        <div className="bg-white rounded-xl shadow p-5 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Revenue</p>
            <h2 className="text-3xl font-bold mt-2">₹12.8L</h2>
          </div>

          <IndianRupee className="text-amber-500" size={34} />
        </div>

        <div className="bg-white rounded-xl shadow p-5 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Growth</p>
            <h2 className="text-3xl font-bold mt-2">+18%</h2>
          </div>

          <TrendingUp className="text-purple-500" size={34} />
        </div>
      </div>

      {/* Analytics Section */}

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Monthly Performance</h2>

          <div className="h-64 flex items-center justify-center text-gray-400">
            <BarChart3 size={70} />
          </div>

          <p className="text-center text-gray-500">
            Chart integration (Recharts/Chart.js) can be added later.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Summary</h2>

          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span>Total Vehicles</span>
              <span className="font-bold">24</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span>Total Drivers</span>
              <span className="font-bold">18</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span>Trips Completed</span>
              <span className="font-bold">312</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span>Fuel Consumption</span>
              <span className="font-bold">1432 L</span>
            </div>

            <div className="flex justify-between">
              <span>Maintenance Cost</span>
              <span className="font-bold">₹2.3L</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
