import { Search, Plus } from "lucide-react";

export default function DriverHeader() {
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">Driver Registry</h1>

          <p className="text-gray-500 mt-2">Manage all drivers</p>
        </div>

        <button className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 shadow">
          <Plus size={18} />
          Add Driver
        </button>
      </div>

      <div className="flex gap-4 mt-8">
        <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl shadow">
          <Search size={18} />

          <input placeholder="Search Driver..." className="outline-none" />
        </div>

        <select className="bg-white rounded-xl shadow px-4">
          <option>All Status</option>

          <option>Available</option>

          <option>On Trip</option>

          <option>Off Duty</option>

          <option>Suspended</option>
        </select>
      </div>
    </>
  );
}
