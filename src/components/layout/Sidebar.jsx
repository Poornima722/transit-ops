import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Truck,
  Users,
  Route,
  Wrench,
  Fuel,
  BarChart3,
  Settings,
} from "lucide-react";

const menu = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Vehicles", icon: Truck, path: "/vehicles" },
  { name: "Drivers", icon: Users, path: "/drivers" },
  { name: "Trips", icon: Route, path: "/trips" },
  { name: "Maintenance", icon: Wrench, path: "/maintenance" },
  { name: "Fuel", icon: Fuel, path: "/fuel" },
  { name: "Reports", icon: BarChart3, path: "/reports" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-slate-900 text-white p-6 fixed">
      <h1 className="text-3xl font-bold text-amber-400">TransitOps</h1>

      <p className="text-gray-400 mb-10">Fleet Management</p>

      <div className="space-y-3">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700"
          >
            <item.icon size={20} />
            {item.name}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}
