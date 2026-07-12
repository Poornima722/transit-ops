import { useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import VehicleHeader from "../../components/vehicle/VehicleHeader";
import VehicleTable from "../../components/vehicle/VehicleTable";
import VehicleModal from "../../components/vehicle/VehicleModal";

export default function Vehicles() {
  const [showModal, setShowModal] = useState(false);

  const [vehicles, setVehicles] = useState([
    {
      registration: "KA01AB1234",
      model: "Tata Ace Gold",
      type: "Mini Truck",
      capacity: "750 kg",
      odometer: "42,100 km",
      cost: "₹6,80,000",
      status: "Available",
    },
    {
      registration: "KA05CD5678",
      model: "Ashok Leyland Dost",
      type: "Truck",
      capacity: "1200 kg",
      odometer: "65,300 km",
      cost: "₹9,20,000",
      status: "On Trip",
    },
    {
      registration: "KA03EF1111",
      model: "Mahindra Bolero Pickup",
      type: "Pickup",
      capacity: "1000 kg",
      odometer: "54,600 km",
      cost: "₹8,10,000",
      status: "In Shop",
    },
  ]);

  return (
    <DashboardLayout>
      <VehicleHeader onAdd={() => setShowModal(true)} />

      <div className="grid grid-cols-4 gap-5 mt-8 mb-8">
        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Total Vehicles</p>
          <h1 className="text-4xl font-bold mt-2">{vehicles.length}</h1>
        </div>

        <div className="bg-green-100 rounded-xl p-5">
          <p className="text-green-700">Available</p>
          <h1 className="text-4xl font-bold mt-2">
            {vehicles.filter((v) => v.status === "Available").length}
          </h1>
        </div>

        <div className="bg-blue-100 rounded-xl p-5">
          <p className="text-blue-700">On Trip</p>
          <h1 className="text-4xl font-bold mt-2">
            {vehicles.filter((v) => v.status === "On Trip").length}
          </h1>
        </div>

        <div className="bg-orange-100 rounded-xl p-5">
          <p className="text-orange-700">In Shop</p>
          <h1 className="text-4xl font-bold mt-2">
            {vehicles.filter((v) => v.status === "In Shop").length}
          </h1>
        </div>
      </div>

      <VehicleTable vehicles={vehicles} />

      {showModal && (
        <VehicleModal
          onClose={() => setShowModal(false)}
          onSave={(newVehicle) => {
            setVehicles((prevVehicles) => [...prevVehicles, newVehicle]);
            setShowModal(false);
          }}
        />
      )}
    </DashboardLayout>
  );
}
