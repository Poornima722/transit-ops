import DashboardLayout from "../../layouts/DashboardLayout";

export default function Reports() {
  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold">Reports</h1>

      <div className="bg-white rounded-xl shadow p-8 mt-8">
        <p className="text-gray-500">Fleet reports and analytics dashboard.</p>
      </div>
    </DashboardLayout>
  );
}
