const vehicles = [
  {
    reg: "KA01AB1234",
    model: "Tata Ace Gold",
    type: "Mini Truck",
    capacity: "750 kg",
    odometer: "42100 km",
    cost: "₹6.8 L",
    status: "Available",
  },
  {
    reg: "KA05CD5678",
    model: "Ashok Leyland Dost",
    type: "Truck",
    capacity: "1500 kg",
    odometer: "71500 km",
    cost: "₹9.5 L",
    status: "On Trip",
  },
  {
    reg: "KA03EF1111",
    model: "Mahindra Pickup",
    type: "Pickup",
    capacity: "1200 kg",
    odometer: "93400 km",
    cost: "₹8.1 L",
    status: "In Shop",
  },
];

export default function VehicleTable() {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Registration</th>
            <th className="p-4 text-left">Model</th>
            <th className="p-4 text-left">Type</th>
            <th className="p-4 text-left">Capacity</th>
            <th className="p-4 text-left">Odometer</th>
            <th className="p-4 text-left">Cost</th>
            <th className="p-4 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {vehicles.map((v) => (
            <tr key={v.reg} className="border-b hover:bg-gray-50">
              <td className="p-4">{v.reg}</td>
              <td className="p-4">{v.model}</td>
              <td className="p-4">{v.type}</td>
              <td className="p-4">{v.capacity}</td>
              <td className="p-4">{v.odometer}</td>
              <td className="p-4">{v.cost}</td>

              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm
                  ${
                    v.status === "Available"
                      ? "bg-green-100 text-green-700"
                      : v.status === "On Trip"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {v.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
