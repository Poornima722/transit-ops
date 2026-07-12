import { Search, Plus } from "lucide-react";

export default function TripHeader() {
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">Trip Management</h1>

          <p className="text-gray-500 mt-2">Manage fleet trips</p>
        </div>

        <button className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 shadow">
          <Plus size={18} />
          Create Trip
        </button>
      </div>

      <div className="flex gap-4 mt-8">
        <div className="flex items-center gap-2 bg-white rounded-xl shadow px-4 py-3">
          <Search size={18} />

          <input className="outline-none" placeholder="Search Trip..." />
        </div>

        <select className="bg-white rounded-xl shadow px-4">
          <option>All Status</option>

          <option>Draft</option>

          <option>Dispatched</option>

          <option>Completed</option>

          <option>Cancelled</option>
        </select>
      </div>
    </>
  );
}
