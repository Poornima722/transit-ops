import { useState } from "react";
import { X } from "lucide-react";

export default function TripModal({ onClose, onSave }) {
  const [trip, setTrip] = useState({
    source: "",
    destination: "",
    vehicle_id: "11111111-1111-1111-1111-111111111111",
    driver_id: "22222222-2222-2222-2222-222222222222",
    cargo_weight_kg: "",
    planned_distance_km: "",
  });

  const handleChange = (e) => {
    setTrip({
      ...trip,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (
      !trip.source ||
      !trip.destination ||
      !trip.cargo_weight_kg ||
      !trip.planned_distance_km
    ) {
      alert("Please fill all required fields.");
      return;
    }

    onSave(trip);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-[700px] rounded-2xl p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Create Trip</h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <input
            name="source"
            placeholder="Source"
            value={trip.source}
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            name="destination"
            placeholder="Destination"
            value={trip.destination}
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            value="KA01AB1234"
            disabled
            className="border p-3 rounded-xl bg-gray-100"
          />

          <input
            value="Alex Kumar"
            disabled
            className="border p-3 rounded-xl bg-gray-100"
          />

          <input
            name="cargo_weight_kg"
            placeholder="Cargo Weight (kg)"
            value={trip.cargo_weight_kg}
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            name="planned_distance_km"
            placeholder="Distance (km)"
            value={trip.planned_distance_km}
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="bg-gray-300 px-5 py-3 rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 rounded-xl"
          >
            Create Trip
          </button>
        </div>
      </div>
    </div>
  );
}
