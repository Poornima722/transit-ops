import { useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import DriverHeader from "../../components/driver/DriverHeader";
import DriverTable from "../../components/driver/DriverTable";
import DriverModal from "../../components/driver/DriverModal";

export default function Drivers() {
  const [showModal, setShowModal] = useState(false);

  const [drivers, setDrivers] = useState([
    {
      name: "Alex Kumar",
      license: "DL123456",
      category: "LMV",
      phone: "9876543210",
      score: 95,
      status: "Available",
    },
    {
      name: "Rahul Sharma",
      license: "KA765432",
      category: "HMV",
      phone: "9876543211",
      score: 88,
      status: "On Trip",
    },
    {
      name: "Priya Singh",
      license: "KA888999",
      category: "LMV",
      phone: "9876543212",
      score: 92,
      status: "Off Duty",
    },
  ]);

  return (
    <DashboardLayout>
      <DriverHeader onAdd={() => setShowModal(true)} />

      <DriverTable drivers={drivers} />

      {showModal && (
        <DriverModal
          onClose={() => setShowModal(false)}
          onSave={(newDriver) => {
            setDrivers((prevDrivers) => [...prevDrivers, newDriver]);
            setShowModal(false);
          }}
        />
      )}
    </DashboardLayout>
  );
}
