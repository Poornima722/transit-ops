import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Vehicles from "./pages/Vehicles/Vehicles";
import Drivers from "./pages/Drivers/Drivers";
import Trips from "./pages/Trips/Trips";
import Maintenance from "./pages/Maintenance/Maintenance";
import Fuel from "./pages/Fuel/Fuel";
import Reports from "./pages/Reports/Reports";
import Settings from "./pages/Settings/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/vehicles" element={<Vehicles />} />

        <Route path="/drivers" element={<Drivers />} />

        <Route path="/trips" element={<Trips />} />

        <Route path="/maintenance" element={<Maintenance />} />

        <Route path="/fuel" element={<Fuel />} />

        <Route path="/reports" element={<Reports />} />

        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
