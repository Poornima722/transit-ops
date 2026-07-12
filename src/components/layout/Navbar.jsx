import { Bell, Search } from "lucide-react";

export default function Navbar() {
  return (
    <div className="h-20 bg-white shadow flex justify-between items-center px-8">
      <div className="flex items-center gap-3 bg-slate-100 rounded-lg px-4 py-2">
        <Search size={18} />
        <input
          placeholder="Search..."
          className="bg-transparent outline-none"
        />
      </div>

      <div className="flex items-center gap-5">
        <Bell />

        <img src="https://i.pravatar.cc/40" className="rounded-full" />
      </div>
    </div>
  );
}
