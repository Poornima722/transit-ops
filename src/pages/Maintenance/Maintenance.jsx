import DashboardLayout from "../../layouts/DashboardLayout";

export default function Maintenance() {
  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold">Maintenance</h1>

      <div className="bg-white rounded-xl shadow p-8 mt-8">
        <h2 className="text-xl font-semibold mb-3">Scheduled Maintenance</h2>

        <p className="text-gray-500">
          Vehicle maintenance records will appear here.
        </p>
      </div>
    </DashboardLayout>
  );
}
