import DashboardLayout from "../../layouts/DashboardLayout";

export default function Settings() {
  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold">Settings</h1>

      <div className="bg-white rounded-xl shadow p-8 mt-8">
        <p className="text-gray-500">
          Configure users, permissions and application settings.
        </p>
      </div>
    </DashboardLayout>
  );
}
