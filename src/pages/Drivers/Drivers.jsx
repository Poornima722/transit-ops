import DashboardLayout from "../../layouts/DashboardLayout";
import DriverTable from "../../components/driver/DriverTable";

export default function Drivers() {
  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold">Driver Management</h1>

      <p className="text-gray-500 mb-8">Manage drivers and licenses</p>

      <DriverTable />
    </DashboardLayout>
  );
}
