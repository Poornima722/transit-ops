export default function VehicleTable({ vehicles }) {
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
          {vehicles.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center p-8 text-gray-500">
                No vehicles found
              </td>
            </tr>
          ) : (
            vehicles.map((vehicle) => (
              <tr key={vehicle.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{vehicle.registration_number}</td>

                <td className="p-4">{vehicle.name_model}</td>

                <td className="p-4">{vehicle.type}</td>

                <td className="p-4">{vehicle.max_load_capacity_kg} kg</td>

                <td className="p-4">{vehicle.odometer} km</td>

                <td className="p-4">₹{vehicle.acquisition_cost}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold
                    ${
                      vehicle.status === "AVAILABLE"
                        ? "bg-green-100 text-green-700"
                        : vehicle.status === "ON_TRIP"
                          ? "bg-blue-100 text-blue-700"
                          : vehicle.status === "IN_SHOP"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {vehicle.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
