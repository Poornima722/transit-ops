import { useState } from "react";
import { X } from "lucide-react";

export default function VehicleModal({ onClose, onSave }) {
  const [vehicle, setVehicle] = useState({
    registration: "",
    model: "",
    type: "",
    capacity: "",
    odometer: "",
    cost: "",
    status: "Available",
  });

  const handleChange = (e) => {
    setVehicle({
      ...vehicle,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (
      !vehicle.registration ||
      !vehicle.model ||
      !vehicle.type ||
      !vehicle.capacity
    ) {
      alert("Please fill all required fields.");
      return;
    }

    onSave(vehicle);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-[700px] rounded-2xl p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Add Vehicle</h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <input
            name="registration"
            value={vehicle.registration}
            onChange={handleChange}
            placeholder="Registration Number"
            className="border p-3 rounded-xl"
          />

          <input
            name="model"
            value={vehicle.model}
            onChange={handleChange}
            placeholder="Vehicle Model"
            className="border p-3 rounded-xl"
          />

          <input
            name="type"
            value={vehicle.type}
            onChange={handleChange}
            placeholder="Vehicle Type"
            className="border p-3 rounded-xl"
          />

          <input
            name="capacity"
            value={vehicle.capacity}
            onChange={handleChange}
            placeholder="Max Load Capacity (kg)"
            className="border p-3 rounded-xl"
          />

          <input
            name="odometer"
            value={vehicle.odometer}
            onChange={handleChange}
            placeholder="Odometer"
            className="border p-3 rounded-xl"
          />

          <input
            name="cost"
            value={vehicle.cost}
            onChange={handleChange}
            placeholder="Acquisition Cost"
            className="border p-3 rounded-xl"
          />

          <select
            name="status"
            value={vehicle.status}
            onChange={handleChange}
            className="border p-3 rounded-xl col-span-2"
          >
            <option>Available</option>
            <option>On Trip</option>
            <option>In Shop</option>
          </select>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 px-5 py-3 rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 rounded-xl"
          >
            Save Vehicle
          </button>
        </div>
      </div>
    </div>
  );
}
