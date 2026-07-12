import { Search, Plus } from "lucide-react";

export default function VehicleHeader() {
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">Vehicle Registry</h1>

          <p className="text-gray-500 mt-2">Manage your fleet efficiently</p>
        </div>

        <button className="bg-amber-500 hover:bg-amber-600 transition text-white px-5 py-3 rounded-xl flex items-center gap-2 shadow-lg">
          <Plus size={18} />
          Add Vehicle
        </button>
      </div>

      <div className="flex justify-between items-center mt-8">
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-white rounded-xl shadow px-4 py-3">
            <Search size={18} />

            <input placeholder="Search Vehicle..." className="outline-none" />
          </div>

          <select className="bg-white rounded-xl shadow px-4">
            <option>All Status</option>

            <option>Available</option>

            <option>On Trip</option>

            <option>In Shop</option>
          </select>

          <select className="bg-white rounded-xl shadow px-4">
            <option>All Types</option>

            <option>Truck</option>

            <option>Mini Truck</option>

            <option>Pickup</option>
          </select>
        </div>
      </div>
    </>
  );
}
