import DashboardLayout from "../../layouts/DashboardLayout";
import VehicleHeader from "../../components/vehicle/VehicleHeader";
import VehicleTable from "../../components/vehicle/VehicleTable";

export default function Vehicles() {
  return (
    <DashboardLayout>
      <VehicleHeader />

      <VehicleTable />
    </DashboardLayout>
  );
}
