import { useEffect, useState } from "react";
import { getVehicles } from "../../services/vehicleService";

import DashboardLayout from "../../layouts/DashboardLayout";
import VehicleHeader from "../../components/vehicle/VehicleHeader";
import VehicleTable from "../../components/vehicle/VehicleTable";

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await getVehicles();
        setVehicles(data);
      } catch (error) {
        console.error("Error loading vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <DashboardLayout>
      <VehicleHeader />

      <div className="grid grid-cols-4 gap-5 mt-8 mb-8">
        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Total Vehicles</p>
          <h1 className="text-4xl font-bold mt-2">{vehicles.length}</h1>
        </div>

        <div className="bg-green-100 rounded-xl p-5">
          <p className="text-green-700">Available</p>
          <h1 className="text-4xl font-bold mt-2">15</h1>
        </div>

        <div className="bg-blue-100 rounded-xl p-5">
          <p className="text-blue-700">On Trip</p>
          <h1 className="text-4xl font-bold mt-2">6</h1>
        </div>

        <div className="bg-orange-100 rounded-xl p-5">
          <p className="text-orange-700">In Shop</p>
          <h1 className="text-4xl font-bold mt-2">3</h1>
        </div>
      </div>

      <VehicleTable vehicles={vehicles} />
    </DashboardLayout>
  );
}
