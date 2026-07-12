import { useState } from "react";
import { X } from "lucide-react";

export default function DriverModal({ onClose, onSave }) {
  const [driver, setDriver] = useState({
    name: "",
    phone: "",
    license: "",
    category: "LMV",
    expiry: "",
    score: "",
    status: "Available",
  });

  const handleChange = (e) => {
    setDriver({
      ...driver,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!driver.name || !driver.phone || !driver.license || !driver.score) {
      alert("Please fill all required fields.");
      return;
    }

    onSave(driver);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[650px] rounded-2xl shadow-2xl p-8">
        {/* Header */}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Add New Driver</h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block font-medium mb-2">Driver Name</label>

            <input
              type="text"
              name="name"
              value={driver.name}
              onChange={handleChange}
              placeholder="Alex Kumar"
              className="w-full border rounded-xl p-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Contact Number</label>

            <input
              type="text"
              name="phone"
              value={driver.phone}
              onChange={handleChange}
              placeholder="+91 9876543210"
              className="w-full border rounded-xl p-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">License Number</label>

            <input
              type="text"
              name="license"
              value={driver.license}
              onChange={handleChange}
              placeholder="DL12345678"
              className="w-full border rounded-xl p-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">License Category</label>

            <select
              name="category"
              value={driver.category}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            >
              <option>LMV</option>
              <option>HMV</option>
              <option>Transport</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2">License Expiry</label>

            <input
              type="date"
              name="expiry"
              value={driver.expiry}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Safety Score</label>

            <input
              type="number"
              name="score"
              value={driver.score}
              onChange={handleChange}
              placeholder="100"
              className="w-full border rounded-xl p-3"
            />
          </div>

          <div className="col-span-2">
            <label className="block font-medium mb-2">Status</label>

            <select
              name="status"
              value={driver.status}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            >
              <option>Available</option>
              <option>On Trip</option>
              <option>Off Duty</option>
              <option>Suspended</option>
            </select>
          </div>
        </div>

        {/* Buttons */}

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white"
          >
            Save Driver
          </button>
        </div>
      </div>
    </div>
  );
}
