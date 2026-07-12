import TripRow from "./TripRow";

export default function TripTable({ trips }) {
  return (
    <div className="bg-white rounded-xl shadow mt-8 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-4">Source</th>
            <th>Destination</th>
            <th>Vehicle</th>
            <th>Driver</th>
            <th>Weight</th>
            <th>Distance</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {trips.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center p-8 text-gray-500">
                No Trips Found
              </td>
            </tr>
          ) : (
            trips.map((trip, index) => (
              <TripRow key={trip.id || index} trip={trip} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
