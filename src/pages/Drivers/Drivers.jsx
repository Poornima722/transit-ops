import DashboardLayout from "../../layouts/DashboardLayout";

import DriverHeader from "../../components/driver/DriverHeader";

import DriverTable from "../../components/driver/DriverTable";

export default function Drivers() {
  return (
    <DashboardLayout>
      <DriverHeader />

      <DriverTable />
    </DashboardLayout>
  );
}
