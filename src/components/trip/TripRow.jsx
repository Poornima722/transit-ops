export default function TripRow({ trip }) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-4">{trip.source}</td>

      <td>{trip.destination}</td>

      <td>{trip.vehicle}</td>

      <td>{trip.driver}</td>

      <td>{trip.weight} kg</td>

      <td>{trip.distance} km</td>

      <td>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium
${
  trip.status === "Draft"
    ? "bg-gray-200 text-gray-700"
    : trip.status === "Dispatched"
      ? "bg-blue-100 text-blue-700"
      : trip.status === "Completed"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
}`}
        >
          {trip.status}
        </span>
      </td>
    </tr>
  );
}
