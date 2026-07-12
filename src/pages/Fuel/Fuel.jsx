import DashboardLayout from "../../layouts/DashboardLayout";

export default function Fuel() {
  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold">Fuel Logs</h1>

      <div className="bg-white rounded-xl shadow p-8 mt-8">
        <p className="text-gray-500">
          Fuel consumption analytics will appear here.
        </p>
      </div>
    </DashboardLayout>
  );
}
