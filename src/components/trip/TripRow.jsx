export default function TripRow({ trip }) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-4">{trip.source}</td>

      <td>{trip.destination}</td>

      <td>{trip.vehicle?.registration_number || "Not Assigned"}</td>

      <td>{trip.driver?.name || "Not Assigned"}</td>

      <td>{trip.cargo_weight_kg} kg</td>

      <td>{trip.planned_distance_km} km</td>

      <td>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium
            ${
              trip.status === "DRAFT"
                ? "bg-gray-200 text-gray-700"
                : trip.status === "DISPATCHED"
                  ? "bg-blue-100 text-blue-700"
                  : trip.status === "COMPLETED"
                    ? "bg-green-100 text-green-700"
                    : trip.status === "CANCELLED"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
            }`}
        >
          {trip.status}
        </span>
      </td>
    </tr>
  );
}
