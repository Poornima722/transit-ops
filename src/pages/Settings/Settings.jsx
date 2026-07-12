import DashboardLayout from "../../layouts/DashboardLayout";
import { User, Shield, Bell, Database, Globe, Lock } from "lucide-react";

export default function Settings() {
  const settings = [
    {
      title: "User Management",
      description: "Manage users and roles",
      icon: <User size={30} className="text-blue-600" />,
    },
    {
      title: "Security",
      description: "Passwords & access control",
      icon: <Shield size={30} className="text-red-500" />,
    },
    {
      title: "Notifications",
      description: "Email & system alerts",
      icon: <Bell size={30} className="text-yellow-500" />,
    },
    {
      title: "Database",
      description: "Backup & restore settings",
      icon: <Database size={30} className="text-green-600" />,
    },
    {
      title: "Regional Settings",
      description: "Language, currency & timezone",
      icon: <Globe size={30} className="text-purple-600" />,
    },
    {
      title: "Privacy",
      description: "Permissions & data protection",
      icon: <Lock size={30} className="text-gray-700" />,
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Settings</h1>

          <p className="text-gray-500 mt-2">
            Configure application preferences and security
          </p>
        </div>

        <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl shadow-lg">
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {settings.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-6 hover:shadow-xl transition cursor-pointer"
          >
            <div className="mb-4">{item.icon}</div>

            <h2 className="text-xl font-semibold">{item.title}</h2>

            <p className="text-gray-500 mt-2">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow mt-8 p-6">
        <h2 className="text-2xl font-semibold mb-4">System Information</h2>

        <div className="space-y-3">
          <div className="flex justify-between border-b pb-2">
            <span>Application Version</span>
            <span className="font-semibold">v1.0.0</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span>Environment</span>
            <span className="font-semibold">Development</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span>Database</span>
            <span className="font-semibold">PostgreSQL</span>
          </div>

          <div className="flex justify-between">
            <span>Framework</span>
            <span className="font-semibold">React + Vite</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
