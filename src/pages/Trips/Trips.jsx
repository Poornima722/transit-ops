import DashboardLayout from "../../layouts/DashboardLayout";

import TripHeader from "../../components/trip/TripHeader";

import TripTable from "../../components/trip/TripTable";

export default function Trips() {
  return (
    <DashboardLayout>
      <TripHeader />

      <TripTable />
    </DashboardLayout>
  );
}
