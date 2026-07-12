import { Search, Plus } from "lucide-react";

export default function DriverHeader({ onAdd }) {
  return (
    <>
      {/* Header */}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">Driver Registry</h1>

          <p className="text-gray-500 mt-2">Manage all drivers</p>
        </div>

        <button
          onClick={onAdd}
          className="bg-amber-500 hover:bg-amber-600 transition text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg font-semibold"
        >
          <Plus size={18} />
          Add Driver
        </button>
      </div>

      {/* Search & Filter */}

      <div className="flex justify-between items-center mt-8">
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-white rounded-xl shadow px-4 py-3 w-80">
            <Search size={18} className="text-gray-500" />

            <input
              type="text"
              placeholder="Search Driver..."
              className="outline-none w-full"
            />
          </div>

          <select className="bg-white rounded-xl shadow px-4 py-3">
            <option>All Status</option>
            <option>Available</option>
            <option>On Trip</option>
            <option>Off Duty</option>
            <option>Suspended</option>
          </select>
        </div>
      </div>
    </>
  );
}
