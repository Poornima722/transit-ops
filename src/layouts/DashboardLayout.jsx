import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 flex-1 bg-slate-100 min-h-screen">
        <Navbar />

        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
